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
        opp: null,
    }

    onUserClickHandler = (userId) => {
        console.log(userId)
        let id;
        if (userId > this.props.auth.uid) {
            id = userId + this.props.auth.uid;
        }
        else id = this.props.auth.uid + userId;
        this.setState({ receiverId: userId, chatId: id, opp: this.props.users[userId] })
    }

    render() {
        const { users, profile, auth, presence, chats } = this.props;
        console.log(this.props.users)
        console.log('presence', presence);
        const usersList = !isLoaded(users) || !isLoaded(presence)
            ? 'Loading'
            : isEmpty(users) || isEmpty(presence) || isEmpty(auth)
                ? 'users list is empty'
                : <ProfileList users={users} presence={presence} onClickUser={this.onUserClickHandler} chats={chats} id={auth.uid}/>
        
        return (<div>

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
                    {this.state.opp ? <img src={this.state.opp.avatarUrl} style={{ borderRadius: "30px", width: "60px", height: "60px" }} alt="avatarUrl" />  : "" } 
                        
                        <div className="chat-about">
                            <div className="chat-with">{this.state.opp ? this.state.opp.displayName : "Choose someone from user list"}</div>
                        </div>
                        <i className="fa fa-star" />
                    </div> {/* end chat-header */}
                    <Chats params={{ chatId: this.state.chatId, opp: this.state.opp }} />
                    {this.state.opp ? <SendMessages receiverId={this.state.receiverId} chatId={this.state.chatId} />  : ""}
                </div>
            </div> {/* end container */}
        </div>)
    }
}
export default compose(
    firebaseConnect([
        'users', // { path: '/todos' } // object notation
        'presence',
        'chats'
    ]),
    connect((state) => ({
        auth: state.firebase.auth,
        users: state.firebase.data.users,
        presence: state.firebase.data.presence,
        chats: state.firebase.data.chats,
        profile: state.firebase.profile // load profile
    }))
)(ChatScreen)