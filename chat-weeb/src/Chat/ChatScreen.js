import React, { Component } from 'react';
import SendMessages from './SendMessage';
import Chats from './Chats';

class ChatScreen extends React.Component {
    render() {
        return(<div>
            <SendMessages />
            <Chats params={{chatId: 'datspotsdattgk97'}} />
        </div>)
    }
}
export default ChatScreen;