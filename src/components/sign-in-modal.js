import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

class SignInModal extends React.Component {

    static propTypes = {
        isShow: PropTypes.bool.isRequired,
        onSaveChanges: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.userNameInputRef = React.createRef();
        this.state = { show: props.isShow, userName: "" };
      }

    handleClose = () => this.setState({show: false});

    handleOnClick = () => {
        this.props.onSaveChanges(this.state.userName);
        this.handleClose();
    }

    handleKeyPress(target, handleOnClick) {
        if(target.charCode === 13 && target.shiftKey === false){
            target.preventDefault();
            handleOnClick();    
        } 
    }

    componentDidMount() {
        this.userNameInputRef.current.focus();
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Create Username</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlaintextEmail">
                            <Form.Label>
                            Please create a username for chatting!
                            </Form.Label>
                            <Form.Control
                                onKeyPress={(e) => this.handleKeyPress(e, this.handleOnClick)}
                                onChange={e => this.setState({userName: e.target.value})}
                                ref={this.userNameInputRef}
                                as="input" 
                                placeholder="Username" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleOnClick}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SignInModal