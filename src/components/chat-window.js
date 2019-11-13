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
        groupKey: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                username: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                timestamp: PropTypes.object.isRequired,
                likes: PropTypes.arrayOf(
                    PropTypes.shape({
                        username: PropTypes.string
                    }
                ))
            })
        ),
        writeMessages: PropTypes.func.isRequired,
        writeLike: PropTypes.func.isRequired
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Navbar style={{marginLeft:"25%"}} bg="dark" variant="dark" fixed="top" className="justify-content-center">
                            <Navbar.Brand>
                            Fire Side Chats
                            </Navbar.Brand>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.props.currentUser && 
                        <div className="messagesList">
                            <Messages
                                currentUser={this.props.currentUser}
                                messages={this.props.messages}
                                writeLike={this.props.writeLike}
                            />
                        </div>}
                    </Col>
                </Row>
                <Row style={{marginLeft:"25%"}} className="absolute-bottom">
                    <Col>
                        <ChatInput
                            groupKey={this.props.groupKey}
                            currentUser={this.props.currentUser}
                            writeMessages={this.props.writeMessages} />
                    </Col>
                </Row>
            </>
        );
    }
}

export default ChatWindow;