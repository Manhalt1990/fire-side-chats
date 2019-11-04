import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

class ChatGroups extends React.Component {

    render() {
        return (
            <div id={"chat-groups"}>
                <Row>
                    <Col>
                        <ButtonGroup vertical>
                            <Button>Group Name</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChatGroups;