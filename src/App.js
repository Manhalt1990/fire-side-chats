import React from 'react';
import Firebase from 'firebase';
import config from '../src/config';
import ChatGroups from './components/chat-groups'
import ChatWindow from './components/chat-window'
import SignInModal from './components/sign-in-modal'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends React.Component {

  constructor(props){
    super(props);
    Firebase.initializeApp(config);
  
    this.state = {
      messages: {},
      currentUser: ""
    }
  }

  writeMessages = (messages) => {
    Firebase.database().ref('/messages').push().set(messages);
    console.log('DATA SAVED');
  }

  writeLike = (key, userName) => {
    let likes = Firebase.database().ref('/messages/'+key+'/likes').push();
    likes.set({userName});
  }

  getMessagesData = () => {
    let ref = Firebase.database().ref('/messages');
    ref.on('value', snapshot => {
      this.setState({messages: snapshot.val()})
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
        <ChatGroups/>
        <ChatWindow
          currentUser={this.state.currentUser}
          messages={this.state.messages}
          writeMessages={this.writeMessages}
          writeLike={this.writeLike}/>
        <SignInModal 
          isShow={true}
          onSaveChanges={(userName) => this.onModalSave(userName)}/>
      </>
    );
  }
}

export default App;
