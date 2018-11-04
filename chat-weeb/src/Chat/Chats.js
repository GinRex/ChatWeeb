import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

// Component enhancer that loads todo into redux then into the todo prop
const enhance = compose(
  firebaseConnect((props) => {
    // Set listeners based on props (prop is route parameter from react-router in this case)
    return [
      { path: `chats/${props.params.chatId}` }, // create todo listener
      // `todos/${props.params.todoId}` // equivalent string notation
    ]
  }),
  connect(({ firebase }, props) => ({
    chat: getVal(firebase, `data/chats/${props.params.chatId}`), // lodash's get can also be used
  }))
)

const Chats = ({ chat, firebase, params }) =>{
  firebase.watchEvent('value', 'chats');
  // console.log(chat);
  return(<div></div>)
}
  // <div>
  //   {/* <input
  //     name="isDone"
  //     type="checkbox"
  //     // checked={todo.isDone}
  //     onChange={() =>
  //       firebase.update(`todos/${params.chatId}`, { done: !todo.isDone })
  //     }
  //   /> */}
  //   <span>{chat.text}</span>
  // </div>

// Export enhanced component
export default enhance(Chats)