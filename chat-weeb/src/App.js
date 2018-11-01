import React, { Component } from 'react';
import './App.css';
import firebaseInit from './firebase';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { auth } from 'firebase';
import Home from './Home';
import Login from './Login';

var hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    firebaseInit();
  }
  render() {
    return (
      <Router history={hist}>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/login" />
        </div>
      </Router>
    );
  }
}

export default App;
