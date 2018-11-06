import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'

class SendMessages extends React.Component {
  state = {
    text: "",
  }
  messageHandler = (e) => {
    this.setState({text: e.target.value})
  }
  handleKeyPress = (key) => {
    if(key.charCode == 13) {
      this.pushMessage();
    }
  }
  pushMessage = () => {
    const { firebase, chatId, receiverId, profile, auth } = this.props;
    const message = { text: this.state.text, receiveId: receiverId, senderId: auth.uid, timestamp: '1512123' };
    firebase.push('chats/' + chatId, message)
    this.setState({text: ""})
  };
  render() {    

    //   const sampleThread = {id1:'datspots', id2: 'dattgk97'}
    
    return (
      <div className="chat-message clearfix">
        <textarea 
        name="message-to-send" 
        id="message-to-send" 
        placeholder="Type your message" 
        rows={3} defaultValue={""} 
        value={this.state.text} 
        onChange={this.messageHandler}
        onKeyPress={this.handleKeyPress}/>
        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />
        <button onClick={this.pushMessage}>Send</button>
      </div>
    )
  }
}
export default connect((state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
}))(withFirebase(SendMessages))
