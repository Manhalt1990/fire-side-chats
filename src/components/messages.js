import React from 'react'
import PropTypes from 'prop-types'
import Message from './message'


class Messages extends React.Component {

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                userName: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                timestamp: PropTypes.string.isRequired,
                likes: PropTypes.arrayOf(PropTypes.string)
            })
        )
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

    createMessages = (messages) => messages.map((message, i) => {
        return (
            <Message
                key={i}
                isCurrentUser={message.userName === this.props.currentUser}
                userName={message.userName}
                text={message.text}
                timestamp={message.timestamp}
            />
        );
    })

    render() {
        return (
            <div >
                {this.createMessages(this.props.messages)}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}

export default Messages