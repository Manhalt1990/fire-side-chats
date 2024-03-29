import React from 'react'
import PropTypes from 'prop-types'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Octicon, { Heart } from '@primer/octicons-react'

class MessageLike extends React.Component {

    static propTypes = {
        messageId: PropTypes.string.isRequired,
        currentUser: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        likes: PropTypes.arrayOf(PropTypes.shape(
            {
                username: PropTypes.string.isRequired
            }
        )),
        writeLike: PropTypes.func.isRequired
    }

    handleOnClick = () => {
        const {currentUser, writeLike, likes, userName, messageId} = this.props;
        let isCurrentUser = userName === currentUser;
        if(!isCurrentUser && (likes && !likes.includes({username: userName}))){
            writeLike(messageId, currentUser);
            console.log("Add Like");
        }
    }

    renderHeartIcon = (likes) => (<div className={"float-right"} onClick={this.handleOnClick}>
                                    <Octicon size={"medium"} icon={Heart}/>
                                    {likes && likes.length > 0 && likes.length}
                                </div>)

    renderOverlay = (likes) => {
        const tooltip = (<Tooltip>
                            {likes.map(like => like.username).join(", ")}
                        </Tooltip>);
        return (
            <OverlayTrigger
                placement={"top"}
                overlay={tooltip}>
                {this.renderHeartIcon(likes)}
            </OverlayTrigger>
        );
    }

    render() {
        const { likes } = this.props;
        if(likes.length > 0) {
            return this.renderOverlay(likes);
        } else {
            return this.renderHeartIcon();
        }
    }
}

export default MessageLike;