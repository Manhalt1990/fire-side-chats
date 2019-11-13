import React from 'react';
import Firebase from 'firebase';
import config from '../src/config';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
      messages: [],
      groups: [],
      selectedGroup: "",
      currentUser: ""
    }
  }

  writeMessages = (message) => {
    Firebase.firestore()
      .collection('rooms')
      .doc(this.state.selectedGroup)
      .collection('messages')
      .add(message);
    console.log('DATA SAVED');
  }

  writeLike = (key, userName) => {
    Firebase.firestore()
      .collection('rooms')
      .doc(this.state.selectedGroup)
      .collection('messages')
      .doc(key)
      .collection('likes')
      .doc(userName)
      .add({username: userName});
  }

  writeAddNewGroup = (group) => {
    Firebase.firestore().collection('rooms').doc(group.name)
      .set({
        name: group.name
      });
    console.log("Group Created");
  }

  getGroupsData = (selectedGroup) => {
    selectedGroup = selectedGroup || this.state.selectedGroup;
    Firebase.firestore().collection('rooms')
    .onSnapshot( snapshot => {
      let groups = [];
      let i = 0;
      snapshot.forEach( doc => {
        groups.push(doc.data())
        if((selectedGroup && doc.data().name === selectedGroup) || i === 0){
          this.getMessagesData(doc.ref.collection('messages').orderBy('timestamp'));
        }
        i++;
      })
      const newSelectedGroup = selectedGroup || (groups && groups[0].name) || '';
      this.setState({groups: groups, selectedGroup: newSelectedGroup})
    })
  }

  getMessagesData = (messages) => {
    messages.onSnapshot(snapshot => {
      let currentMessages = [];
      snapshot.forEach(doc => {
        let message = doc.data();
        doc.ref.collection('likes').onSnapshot(snapshot => {
          let likes = [];
          snapshot.forEach(like => likes.push(like.data()));
          message.likes = likes;
        })
        message.id = doc.id
        currentMessages.push(message);
      })
      this.setState({messages: currentMessages});
    });
  }

  onModalSave = (userName) => {
    this.setState({currentUser: userName})
  }

  onGroupSelectChange = (selectedGroup) => {
    this.setState({selectedGroup: selectedGroup});
    this.getGroupsData(selectedGroup);
  }

  componentDidMount() {
    this.getGroupsData()
  }

  render() { 
    return (
      <Container fluid>
        <Row>
          <Col xs={3} style={{background: "#4f575f", position: "fixed", height: "-webkit-fill-available"}}>
            <ChatGroups
              writeAddNewGroup={this.writeAddNewGroup}
              selectedGroup={this.state.selectedGroup}
              groups={this.state.groups}
              onGroupSelectChange={this.onGroupSelectChange}/>
          </Col>
          <Col xs={{ span:9, offset: 3}}>
            <ChatWindow
              className={"chatWindow"}
              groupKey={this.state.selectedGroup}
              currentUser={this.state.currentUser}
              messages={this.state.messages}
              writeMessages={this.writeMessages}
              writeLike={this.writeLike}/>
          </Col>
        </Row>
        <SignInModal 
          isShow={true}
          onSaveChanges={(userName) => this.onModalSave(userName)}/>
      </Container>
    );
  }
}

export default App;
