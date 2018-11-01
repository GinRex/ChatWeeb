import React, { Component } from 'react';
import './App.css';
import firebaseInit from './firebase';
import { createBrowserHistory } from "history";
import { Router, Route, Redirect } from "react-router-dom";
import Home from './Home';

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
          <Route path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
