import React, { Component } from 'react';
import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import firebaseInit from './firebase';
import { auth } from 'firebase';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    loginHandle = () => {

        const base_provider = new auth.GoogleAuthProvider();
        console.log("login in");
        auth().signInWithRedirect(base_provider).then((result) => {
            console.log(result);
            console.log('success');
        }).catch((err) => {
            console.log(err);
            console.log('error');
        })
    }
    componentWillMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push("/home");
            }
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.loginHandle}>Login</button>
            </div>
        );
    }
}

export default Login;