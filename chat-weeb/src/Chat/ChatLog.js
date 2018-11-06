import React, { Component } from 'react';

class ChatLog extends React.Component {
    state = {
        ChatLog: []
    }
    render() {
        const { chats } = this.props;
        return(<div>
            {chats != null ? Object.keys(chats).map((key) => (
                <p>{chats[key].text}</p>
            )) : <div>nothing</div>}
        </div>)
    }
}
export default ChatLog;