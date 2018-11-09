import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';


class message extends React.Component {
    state = {
        image: '',
        text: ''
    }
    isImageUrl = (url) => {
        let ima = new Image();
        ima.src = url;
        ima.onload = () => {
            this.setState({ image: url })
        }
        ima.onerror = () => {
        }
    }
    render() {
        const { message, auth, opp } = this.props;
        let words = message.text.split(" ");
        let text = "";
        // console.log(words);
        words.map((word) => {
            // console.log()
            this.isImageUrl(word);
            if (this.state.image == word) {
                word = "";
            }
            word += " ";
            text += word;
        })

        return (
            auth.uid == message.receiveId && auth.uid !== message.senderId ?
                <div>
                    <div className="message-data">
                        <span className="message-data-name"><i className="fa fa-circle online" />{auth.displayName}</span>
                        <span className="message-data-time">{moment(message.timestamp).format("DD MMM YYYY hh:mm a")}</span>
                    </div>
                    <div className="message my-message">
                        {text}<br />
                        {this.state.image ? <img src={this.state.image} style={{ width: "100%", height: "100%" }} /> : ""}
                    </div>
                </div>
                :
                <div>
                    <div className="message-data align-right">
                        <span className="message-data-name"><i className="fa fa-circle online" />{opp.displayName}</span>
                        <span className="message-data-time">{moment(message.timestamp).format("DD MMM YYYY hh:mm a")}</span>
                    </div>
                    <div className="message other-message float-right">

                        {text}<br />
                        {this.state.image ? <img src={this.state.image} style={{ width: "100%", height: "100%" }} /> : ""}
                    </div>
                </div>
        )
    }
}

export default connect((state) => ({
    auth: state.firebase.auth
}))(message)