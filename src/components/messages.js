import React from 'react'
import PropTypes from 'prop-types'
import Message from './message'


class Messages extends React.Component {

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                timestamp: PropTypes.object.isRequired,
                likes: PropTypes.arrayOf(
                    PropTypes.shape({
                        username: PropTypes.string
                    })
                )
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

    createMessages = (messages) => messages.map((message, i) => {
        let likes = message.likes || [];
        return (
            <Message
                key={i}
                messageId={message.id}
                currentUser={this.props.currentUser}
                userName={message.username}
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