import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyDEvooYPN6SfkqeQjVJvoHo_uzoPv_N8cE",
    authDomain: "chat-weeb.firebaseapp.com",
    databaseURL: "https://chat-weeb.firebaseio.com",
    projectId: "chat-weeb",
    storageBucket: "chat-weeb.appspot.com",
    messagingSenderId: "60097506252"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    enableLogging: false, // enable/disable Firebase's database logging
  presence: "presence", // where list of online users is stored in database
  sessions: "sessions" // where list of user sessions is stored in database (presence must be enabled)
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();