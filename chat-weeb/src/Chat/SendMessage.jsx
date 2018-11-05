import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'

const SendMessages = ({ firebase }) => {
  // const sampleMess = { text: 'Fuck you', receiveId:'dattgk97', senderId:'datspots', timestamp:'1512123' };
  const sampleMess = { text: 'El psy congroo', receiveId:'datspots', senderId:'dattgk97', timestamp:'1512123' };
//   const sampleThread = {id1:'datspots', id2: 'dattgk97'}
  const pushSample = () => {
      firebase.push('chats/' + 'datspotsdattgk97', sampleMess)};
    //   firebase.push
  return (
    <div>
      <h1>Todos</h1>
      <ul>
          Messages
      </ul>
      <input type="text"/>
      <button onClick={pushSample}>
        Add
      </button>
    </div>
  )
}

export default withFirebase(SendMessages)
// or firebaseConnect()(Todos)