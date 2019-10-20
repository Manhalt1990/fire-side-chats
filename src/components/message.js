import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class Message extends React.Component {

    static propTypes = {
        isCurrentUser: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired
    }

    getCardType = (isCurrentUser) => isCurrentUser ? "info" : "secondary"
    getClassName = (isCurrentUser) => isCurrentUser 
        ? "float-right" 
        : "float-left"

    render() {
        return (
            <Row style={{marginTop: "1rem"}}>
                <Col>
                    <Card bg={this.getCardType(this.props.isCurrentUser)} 
                    text="white" 
                    style={{ width: '18rem' }}
                    className={this.getClassName(this.props.isCurrentUser)}>
                        <Card.Body>
                            <Card.Title>{this.props.userName}</Card.Title>
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