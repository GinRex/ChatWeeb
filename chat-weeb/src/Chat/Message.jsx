import React from 'react';
import { connect } from 'react-redux'


const message = ({ message, auth, opp }) => {
    return (
        auth.uid == message.receiveId ?
        <div>
            <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online" />{auth.displayName}</span>
                <span className="message-data-time">{message.timestamp}</span>
            </div>
            <div className="message my-message">
                {message.text}
            </div>
        </div>
        :
        <div>
            <div className="message-data align-right">
                <span className="message-data-name"><i className="fa fa-circle online" />{opp.displayName}</span>
                <span className="message-data-time">{message.timestamp}</span>
            </div>
            <div className="message other-message float-right">
                {message.text}
            </div>
        </div>
    )
}

export default connect((state) => ({
    auth: state.firebase.auth
  }))(message)