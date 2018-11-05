import React, { Component } from 'react';
import SendMessages from './SendMessage';
import Chats from './Chats';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ProfileList from '../Components/Profile/ProfileList';
import './ChatScreen.scss';


class ChatScreen extends React.Component {

    render() {
        const { users, profile } = this.props;
        console.log('profile', profile);
        const reciver = {
            receiverId: 'yhNuj37aWPcoHOTgsB7dJi1khEt1'
        }
        const usersList = !isLoaded(users)
            ? 'Loading'
            : isEmpty(users)
                ? 'users list is empty'
                : <ProfileList users={users} />
        return (<div>
            <SendMessages receiver={reciver}/>
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
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatarUrl" />
                        <div className="chat-about">
                            <div className="chat-with">Chat with Vincent Porter</div>
                            <div className="chat-num-messages">already 1 902 messages</div>
                        </div>
                        <i className="fa fa-star" />
                    </div> {/* end chat-header */}
                    <Chats params={{ chatId: 'datspotsdattgk97' }} />
                    <div className="chat-message clearfix">
                        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
                        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />
                        <button>Send</button>
                    </div> {/* end chat-message */}
                </div> {/* end chat */}
            </div> {/* end container */}
        </div>)
    }
}
export default compose(
    firebaseConnect([
        'users' // { path: '/todos' } // object notation
    ]),
    connect((state) => ({
        users: state.firebase.data.users,
        profile: state.firebase.profile // load profile
    }))
)(ChatScreen)