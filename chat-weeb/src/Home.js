import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import firebase, { auth } from 'firebase';
import { withFirebase } from 'react-redux-firebase'
import Users from './actions/users';
import ChatScreen from './Chat/ChatScreen';

class Home extends Component {
    state = {
        login: false,
        anchorEl: null,
        user: null,
        users: []
    };

    handleChange = event => {
        this.setState({ login: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    signOutHandle = () => {
        auth().signOut();
        this.setState({ login: false, user: null, anchorEl: null })
    }

    loginHandle = () => {

        const base_provider = new auth.GoogleAuthProvider();
        console.log("login in");
        auth().signInWithPopup(base_provider).then((result) => {
            console.log(result);
            console.log('success');
        }).catch((err) => {
            console.log(err);
            console.log('error');
        })
    }

    saveData = (user) => {
        let id = user.email.slice(0, user.email.indexOf("@"));
        console.log(id);
        const ref = firebase.database().ref("users/" + id);
        ref.set({ "username": user.displayName, "email": user.email, "avatar": user.photoURL });
    }
    loadUsers = () => {
        const ref = firebase.database().ref("users");
        ref.on('value', (users) => {
            console.log(users.val());
            this.setState({users: users.val()});
            console.log(this.state);
        })
    }
    componentWillMount() {
        auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user, login: true })
                console.log(user);
                this.saveData(user);
                this.loadUsers();
            }
        })
    }

    render() {
        const { classes } = this.props;
        const { login, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Chat Weeb
                </Typography>
                        {login ? (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    {this.state.user.photoURL ? (<Avatar style={{ height: "30px", width: "30px" }} src={this.state.user.photoURL} />) : <AccountCircle />}
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>{this.state.user.displayName}</MenuItem>
                                    <MenuItem onClick={this.signOutHandle}>Log Out</MenuItem>
                                </Menu>
                            </div>
                        ) : <Button variant="contained" color="secondary" onClick={this.loginHandle}>Login</Button>}
                    </Toolbar>
                </AppBar>
                <Users />
                <ChatScreen />
            </div>
        );
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


export default withStyles(styles)(Home);
