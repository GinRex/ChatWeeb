import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'
import Message from './Message';
import './ChatScreen.scss';

// Component enhancer that loads todo into redux then into the todo prop
const enhance = compose(
  firebaseConnect((props) => {
    // Set listeners based on props (prop is route parameter from react-router in this case)
    // console.log(props)
    return [
      { path: `chats/${props.params.chatId}` }, // create todo listener
      // `todos/${props.params.todoId}` // equivalent string notation
    ]
  }),
  connect(({ firebase }, props) => ({
    chat: getVal(firebase, `data/chats/${props.params.chatId}`), // lodash's get can also be used
  }))
)

class Chats extends React.Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { chat, firebase, params } = this.props;

    // console.log(chat);
    return (
      <div>
        <div className="chat-history">
          <ul>
            {chat && Object.keys(chat).map((key, id) => (
              <li className="clearfix">
                <Message message={chat[key]} opp={params.opp} />
              </li>
            ))}
          </ul>
          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      </div>
    )
  }
}

// Export enhanced component
export default enhance(Chats)