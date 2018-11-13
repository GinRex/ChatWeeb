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
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import Users from './actions/users';
import ChatScreen from './Chat/ChatScreen';
import { connect } from 'react-redux'
import moment from 'moment';


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
        
        // firebase.updateProfile({lastOnline: })
        let time = new Date().getTime();
        firebase.database().ref('users/' + this.props.auth.uid + '/lastOnline').set(time);
        this.props.firebase.logout();
        this.setState({ login: false, user: null, anchorEl: null, users: null })
    }

    loginHandle = () => {

        this.props.firebase.login({
            provider: 'google',
            type: 'popup'
        }).then(() => {
            // console.log('aaa')
            // console.log(this.props.auth.uid)
            this.setState({ login: true, profile: this.props.profile});
        })
    }

    render() {
        const { classes, profile, auth } = this.props;
        const { login, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        if (!isEmpty(auth)) {
            let time = new Date().getTime();
            firebase.database().ref('users/' + this.props.auth.uid + '/lastOnline').onDisconnect().set(time);
        }
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
                        {!this.props.auth.isEmpty ? (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    {this.props.profile.avatarUrl ? (<Avatar style={{ height: "30px", width: "30px" }} src={this.props.profile.avatarUrl} />) : <AccountCircle />}
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
                                    <MenuItem onClick={this.handleClose}>{this.props.profile.displayName}</MenuItem>
                                    <MenuItem onClick={this.signOutHandle}>Log Out</MenuItem>
                                </Menu>
                            </div>
                        ) : <Button variant="contained" color="secondary" onClick={this.loginHandle}>Login</Button>}
                    </Toolbar>
                </AppBar>
                {/* <Users /> */}
                {!this.props.auth.isEmpty ?
                <ChatScreen /> : "Please Login first"
                }
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

export default connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }))(withFirebase(withStyles(styles)(Home)));
