import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';


class message extends React.Component {
    constructor(props) {
        super(props);
        let imageLink = '';
    }
    state = {
        text: '',
    }

    render() {
        
        const { message, auth, opp } = this.props;
        // console.log(words);

        return (
            auth.uid == message.receiveId && auth.uid !== message.senderId ?
                <div>
                    <div className="message-data">
                        <span className="message-data-name"><i className="fa fa-circle online" />{opp.displayName}</span>
                        <span className="message-data-time">{moment(message.timestamp).format("DD MMM YYYY hh:mm a")}</span>
                    </div>
                    <div className="message my-message">
                        {message.text}<br />
                        {message.image !== '' ? <img src={message.image} style={{ width: "100%", height: "100%" }} /> : ""}
                    </div>
                </div>
                :
                <div>
                    <div className="message-data align-right">
                        <span className="message-data-name"><i className="fa fa-circle online" />{auth.displayName}</span>
                        <span className="message-data-time">{moment(message.timestamp).format("DD MMM YYYY hh:mm a")}</span>
                    </div>
                    <div className="message other-message float-right">

                        {message.text}<br />
                        {message.image !== '' ? <img src={message.image} style={{ width: "100%", height: "100%" }} /> : ""}
                    </div>
                </div>
        )
    }
}

export default connect((state) => ({
    auth: state.firebase.auth
}))(message)