import React, { Component } from 'react';
import { auth } from 'firebase';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  signOutHandle = () => {
    auth().signOut();
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        Home

        <button onClick={this.signOutHandle}>Sign Out</button>
      </div>
    );
  }
}

export default Home;
