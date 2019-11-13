import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import CreateGroupModal from './create-group-modal'

class ChatGroups extends React.Component {

    static propTypes = {
        selectedGroup: PropTypes.string,
        groups: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        })),
        writeAddNewGroup: PropTypes.func.isRequired,
        onGroupSelectChange: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
  
        this.state = {
            isModalVisible: false
        }
    }

    handleOnSaveChanges = (groupName) => {
        const group = {
            'name': groupName
        }
        this.props.writeAddNewGroup(group);
    }

    handleAddOnClick = () => this.setState({isModalVisible: true});

    handleGroupOnClick = (name) => {
        console.log(name);
        this.props.onGroupSelectChange(name);
    }

    handleOnClose = () => this.setState({isModalVisible: false});

    renderGroup = (name, index) => (
    <Button 
        key={index} 
        onClick={() => this.handleGroupOnClick(name)}
        style={{background: "#4f575f"}} 
        variant="dark" 
        size="lg"
        id={name}
        active={this.props.selectedGroup === name}>
        {name}
    </Button>);
        
    render() {
        const { groups } = this.props;
        return (
            <div className={"chatGroups"}>
                <Row>
                    <Col>
                        <h4>Group Chats</h4>
                        <ButtonGroup vertical className="d-flex flex-column">
                            <Button onClick={this.handleAddOnClick} style={{background: "#4f575f", marginBottom: "2rem"}} variant="dark" size="lg">Add New</Button>
                            {groups && groups.map((group, i) => {
                                return this.renderGroup(group.name, i)
                            })}
                        </ButtonGroup>
                    </Col>
                </Row>
                <CreateGroupModal
                    isShow={this.state.isModalVisible}
                    handleOnClose={this.handleOnClose}
                    onSaveChanges={this.handleOnSaveChanges}/>
            </div>
        );
    }
}

export default ChatGroups;