import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'

const SendMessages = ({ firebase, chatId, receiverId, profile, auth }) => {
  const message = { text: 'El psy congroo', receiveId: receiverId, senderId:auth.uid, timestamp:'1512123' };

//   const sampleThread = {id1:'datspots', id2: 'dattgk97'}
  const pushMessage = () => {
      firebase.push('chats/' + chatId, message)
    };
    //   firebase.push
  return (
    <div>
      <h1>Todos</h1>
      <ul>
          Messages
      </ul>
      <input type="text"/>
      <button onClick={pushMessage}>
        Add
      </button>
    </div>
  )
}
export default connect((state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
}))(withFirebase(SendMessages))
