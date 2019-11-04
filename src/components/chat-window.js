import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Messages from './messages'
import ChatInput from './chat-input'

class ChatWindow extends React.Component {

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        messages: PropTypes.objectOf(
            PropTypes.shape({
                userName: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                timestamp: PropTypes.string.isRequired,
                likes: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
            })
        ),
        writeMessages: PropTypes.func.isRequired,
        writeLike: PropTypes.func.isRequired
    }

    render() {
        return (
            <div id="chatWindow">
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" fixed="top" className="justify-content-center">
                            <Navbar.Brand>
                            Fire Side Chats
                            </Navbar.Brand>
                        </Navbar>
                    </Col>
                </Row>
                {this.props.currentUser && 
                <div className="messagesList">
                    <Messages
                        currentUser={this.props.currentUser}
                        messages={this.props.messages}
                        writeLike={this.props.writeLike}
                    />
                </div>}
                <Row className="fixed-bottom">
                    <Col>
                        <ChatInput
                           currentUser={this.props.currentUser}
                           writeMessages={this.props.writeMessages} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChatWindow;