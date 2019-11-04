import React from 'react'
import PropTypes from 'prop-types'
import Message from './message'


class Messages extends React.Component {

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
        writeLike: PropTypes.func.isRequired
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    createMessages = (messages) => Object.keys(messages).map((messageKey, i) => {
        let message = messages[messageKey];
        let likes = (message.likes && Object.values(message.likes).map(like => like.userName)) || [];
        return (
            <Message
                key={i}
                messageKey={messageKey}
                currentUser={this.props.currentUser}
                userName={message.userName}
                text={message.text}
                timestamp={message.timestamp}
                likes={likes}
                writeLike={this.props.writeLike}
            />
        );
    })

    render() {
        const { messages } = this.props;
        return (
            <div >
                {this.createMessages(messages)}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

export default Messages