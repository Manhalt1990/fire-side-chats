import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

class CreateGroupModal extends React.Component {

    static propTypes = {
        isShow: PropTypes.bool.isRequired,
        onSaveChanges: PropTypes.func.isRequired,
        handleOnClose: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.groupNameInputRef = React.createRef();
        this.state = { groupName: "" };
      }

    handleOnClick = () => {
        const { handleOnClose, onSaveChanges} = this.props;
        onSaveChanges(this.state.groupName);
        handleOnClose();
    }

    handleKeyPress(target, handleOnClick) {
        if(target.charCode === 13 && target.shiftKey === false){
            target.preventDefault();
            handleOnClick();    
        } 
    }

    componentDidMount() {
        if(this.groupNameInputRef.current){
            this.groupNameInputRef.current.focus();
        }
    }

    render() {
        return (
            <Modal show={this.props.isShow} onHide={this.props.handleOnClose}>
                <Modal.Header>
                    <Modal.Title>Create Group</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlaintextEmail">
                            <Form.Label>
                            Please create a group name for chatting!
                            </Form.Label>
                            <Form.Control
                                onKeyPress={(e) => this.handleKeyPress(e, this.handleOnClick)}
                                onChange={e => this.setState({groupName: e.target.value})}
                                ref={this.groupNameInputRef}
                                as="input" 
                                placeholder="Group Name" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleOnClick}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateGroupModal