import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import MessageLike from './message-like'

class Message extends React.Component {

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        messageKey: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        likes: PropTypes.arrayOf(PropTypes.string),
        writeLike: PropTypes.func.isRequired
    }

    render() {
        const { currentUser, userName, likes, writeLike, messageKey } = this.props;
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
                                <MessageLike 
                                    userName={userName}
                                    currentUser={currentUser}
                                    messageKey={messageKey}
                                    likes={likes}
                                    writeLike={writeLike}/>
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