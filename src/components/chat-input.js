import React from 'react'
import PropTypes from 'prop-types'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Moment from 'moment'

class ChatInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageText: "" };
      }

    static propTypes = {
        currentUser: PropTypes.string.isRequired,
        writeMessages: PropTypes.func.isRequired
    }

    handleOnClick = () => {
        if(this.state.messageText.charAt(0) === '/'){
            console.log("handle actions: " 
            + this.state.messageText.substr(1, this.state.messageText.length - 1));
        } else {
            this.sendMessage();
        }
    }

    sendMessage = () => {
        var message = {
            'userName': this.props.currentUser,
            'text': this.state.messageText,
            'timestamp': Moment().format()
        }
        this.props.writeMessages(message);
        this.setState({messageText: ""});
    }

    handleKeyPress(target, handleOnClick) {
        if(target.charCode === 13 && target.shiftKey === false){
            target.preventDefault();
            handleOnClick();    
        } 
    }

    render() {
        return (
            <InputGroup>
                <FormControl 
                    onKeyPress={(e) => this.handleKeyPress(e, this.handleOnClick)} 
                    value={this.state.messageText} 
                    onChange={e => this.setState({messageText: e.target.value})} 
                    as="textarea" 
                    aria-label="With textarea" 
                    stlye={{resize: "none" }}/>
                <Button onClick={this.handleOnClick} variant="primary">Send</Button>
            </InputGroup>
        );
    }

}

export default ChatInput