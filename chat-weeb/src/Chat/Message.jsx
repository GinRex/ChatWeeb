import React from 'react';


const message = ({ message }) => {
    return (
        <div>
            <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online" />{message.senderId}</span>
                <span className="message-data-time">{message.timestamp}</span>
            </div>
            <div className="message my-message">
                {message.text}
                </div>
        </div>
    )
}

export default message