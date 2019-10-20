import React from 'react';
import Firebase from 'firebase';
import config from '../src/config';
import ChatWindow from './components/chat-window'
import SignInModal from './components/sign-in-modal'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends React.Component {

  constructor(props){
    super(props);
    Firebase.initializeApp(config);
  
    this.state = {
      messages: [],
      currentUser: ""
    }
  }

  writeMessages = (messages) => {
    Firebase.database().ref('/messages').set(messages);
    console.log('DATA SAVED');
  }

  getMessagesData = () => {
    let ref = Firebase.database().ref('/messages');
    ref.on('value', snapshot => {
      console.log(snapshot.val())
      const messages = snapshot.val() || [];
      this.setState({messages: messages});
    });
    console.log('DATA RETRIEVED');
  }

  onModalSave = (userName) => {
    this.setState({currentUser: userName})
  }

  componentDidMount() {
    this.getMessagesData();
  }

  render() { 
    return (
      <>
        <ChatWindow
          currentUser={this.state.currentUser}
          messages={this.state.messages}
          writeMessages={this.writeMessages}/>
        <SignInModal 
          isShow={true}
          onSaveChanges={(userName) => this.onModalSave(userName)}/>
      </>
    );
  }
}

export default App;
