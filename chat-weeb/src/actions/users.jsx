import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ListUser from '../UsersList';

const Users = ({ users, firebase, profile }) => {
  // Build Todos list if todos exist and are loaded
    // console.log(profile)
  const usersList = !isLoaded(users)
    ? 'Loading'
    : isEmpty(users)
      ? 'Todo list is empty'
      : <ListUser users={users} />
  return (
    <div>
      <ul>
        {usersList}
      </ul>
    </div>
  )
}

export default compose(
  firebaseConnect([
    'users' // { path: '/todos' } // object notation
  ]),
  connect((state) => ({
    users: state.firebase.data.users,
    profile: state.firebase.profile // load profile
  }))
)(Users)