import * as firebase from 'firebase'
let database
const init = () => {
  let config = {
    apiKey: "AIzaSyDEvooYPN6SfkqeQjVJvoHo_uzoPv_N8cE",
    authDomain: "chat-weeb.firebaseapp.com",
    databaseURL: "https://chat-weeb.firebaseio.com",
    projectId: "chat-weeb",
    storageBucket: "chat-weeb.appspot.com",
    messagingSenderId: "60097506252"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}
export default init;