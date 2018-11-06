import React, { Component } from 'react';
import SendMessages from './SendMessage';
import Chats from './Chats';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ProfileList from '../Components/Profile/ProfileList';
import './ChatScreen.scss';


class ChatScreen extends React.Component {
    state = {
        receiverId: null,
        chatId: null,
        opp: null
    }

    onUserClickHandler = (userId) => {
        console.log('aaa')
        console.log(userId);
        let id;
        if (userId > this.props.auth.uid) {
            id = userId + this.props.auth.uid;
        }
        else id = this.props.auth.uid + userId;
        this.setState({receiverId: userId, chatId: id, opp: this.props.users[userId]})
    }
    render() {
        const { users, profile, auth } = this.props;
        console.log('profile', profile);
        const usersList = !isLoaded(users)
            ? 'Loading'
            : isEmpty(users)
                ? 'users list is empty'
                : <ProfileList users={users} onClickUser={this.onUserClickHandler} />
        return (<div>
            <SendMessages receiverId={this.state.receiverId} chatId={this.state.chatId}/>
            <div className="container clearfix">
                <div className="people-list" id="people-list">
                    <div className="search">
                        <input type="text" placeholder="search" />
                        <i className="fa fa-search" />
                    </div>
                    {usersList}
                </div>
                <div className="chat">
                    <div className="chat-header clearfix">
                        <img src="" style={{borderRadius:"30px", width:"60px", height:"60px"}} alt="avatarUrl" />                        <div className="chat-about">
                            <div className="chat-with">Chat with ""</div>
                            <div className="chat-num-messages">already 1 902 messages</div>
                        </div>
                        <i className="fa fa-star" />
                    </div> {/* end chat-header */}
                    <Chats params={{ chatId: this.state.chatId, opp: this.state.opp }} />
                    <div className="chat-message clearfix">
                        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
                        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />
                        <button>Send</button>
                    </div> {/* end chat-message */}
                </div> 
            </div> {/* end container */}
        </div>)
    }
}
export default compose(
    firebaseConnect([
        'users' // { path: '/todos' } // object notation
    ]),
    connect((state) => ({
        auth: state.firebase.auth,
        users: state.firebase.data.users,
        profile: state.firebase.profile // load profile
    }))
)(ChatScreen)