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
        this.state = { show: props.isShow, userName: "" };
      }

    handleClose = () => this.setState({show: false});

    handleOnClick = () => {
        this.props.onSaveChanges(this.state.userName);
        this.handleClose();
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
                            <Form.Control onChange={e => this.setState({userName: e.target.value})} as="input" placeholder="UserName" />
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