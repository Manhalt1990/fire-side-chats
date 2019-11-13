import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import MessageLike from './message-like'

class Message extends React.Component {

    static propTypes = {
        messageId: PropTypes.string.isRequired,
        currentUser: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        timestamp: PropTypes.object.isRequired,
        likes: PropTypes.arrayOf(PropTypes.shape({
            username: PropTypes.string
        })),
        writeLike: PropTypes.func.isRequired
    }

    render() {
        const { messageId, currentUser, userName, likes, writeLike } = this.props;
        const isCurrentUser = userName === currentUser;
        const messageFloatPosition = isCurrentUser ? "float-right" : "float-left";
        const cardType = isCurrentUser ? "info" : "secondary";

        return (
            <Row style={{marginTop: "1rem"}}>
                <Col>
                    <Card bg={cardType} 
                    text="white" 
                    style={{ width: '18rem' }}
                    className={messageFloatPosition}>
                        <Card.Body>
                            <Card.Title>
                                <div>{this.props.userName}</div>
                                {<MessageLike 
                                    messageId={messageId}
                                    userName={userName}
                                    currentUser={currentUser}
                                    likes={likes}
                                    writeLike={writeLike}/>}
                            </Card.Title>
                            <Card.Text>
                                {this.props.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Message;