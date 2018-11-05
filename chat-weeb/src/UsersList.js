import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "#90caf9",
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const ListUser = (props) => {
  const { classes, users } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {Object.keys(users).map((key, id) => (
          <ListItem button>
            <Avatar style={{ height: "30px", width: "30px" }} src={users[key].avatarUrl} />
            <ListItemText primary={users[key].username} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

ListUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListUser);