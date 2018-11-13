import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase, firebaseConnect, getVal } from 'react-redux-firebase'
import { compose, withHandlers, setPropTypes } from 'recompose';
import _, { map } from 'lodash';
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone';

const filesPath = 'uploadedFiles';

const enhance = compose(
  // Create listeners for Real Time Database which write to redux store
  firebaseConnect([{ path: filesPath }]),
  // connect redux state to props
  connect(({ firebase: { data } }) => ({
    uploadedFiles: data[filesPath],
  })),
  connect((state) => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  })),
  // Add handlers as props
  withHandlers(handlers)
);

const handlers = {
  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop: props => files => {
    // uploadFiles(storagePath, files, dbPath)
    // console.log(files)
    return props.firebase.uploadFiles(filesPath, files, filesPath);
  },
  onFileDelete: props => (file, key) => {
    // deleteFile(storagePath, dbPath)
    return props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  }
};

class SendMessages extends React.Component {
  state = {
    text: "",
    image: "",
  }
  messageHandler = (e) => {
    let words = e.target.value.split(" ");
    words.map((word) => {
      this.isImageUrl(word);
    })
    this.setState({ text: e.target.value })
  }
  handleKeyPress = async (key) => {
    if (key.charCode == 13) {
      await this.pushMessage();
      await this.setState({ text: "", image: "" });
    }
  }
  pushMessage = async () => {
    const { firebase, chatId, receiverId, profile, auth } = this.props;
    let time = new Date().getTime();
    let mes = _.clone(this.state.text).trim();
    if (mes == "" && this.state.image == "") {
      await this.setState({ text: "", image: "" });
    }
    else {
      const message = { text: this.state.text + " ", image: this.state.image, receiveId: receiverId, senderId: auth.uid, timestamp: time };
      console.log(message)
      await firebase.push('chats/' + chatId, message)
      await this.setState({ text: "", image: "" })
      await this.setRecord();
    }


  };
  setRecord = () => {
    let time = new Date().getTime();
    this.props.firebase.updateProfile({ lastMessage: time })
  }

  uploadImageHandler = (e) => {
    this.setState({ file: e.target.files[0] })
    // console.log('upload image', e.target.files[0]);
    this.props.firebase.uploadFile(filesPath, e.target.files[0], filesPath);
    // console.log(e.target.files[0].name)
    this.props.firebase.storage().ref().child('uploadedFiles/' + e.target.files[0].name)
      .getDownloadURL().then((url) => this.setState({ image: url }));

  }


  isImageUrl = (url) => {
    let ima = new Image();
    ima.src = url;
    ima.onload = () => {
      this.setState({ image: url });
    }
    // ima.onerror = () => {
    //     this.setState({ image: ''})
    // }
  }

  render() {
    //   const sampleThread = {id1:'datspots', id2: 'dattgk97'}
    const { uploadedFiles, onFileDelete, onFilesDrop } = this.props;
    // console.log(uploadedFiles);

    return (
      <div className="chat-message clearfix">
        <textarea
          name="message-to-send"
          id="message-to-send"
          placeholder="Type your message"
          rows={3} defaultValue={""}
          value={this.state.text}
          onChange={this.messageHandler}
          onKeyPress={this.handleKeyPress} />
        <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o" />

        <button onClick={this.pushMessage} id="icon-button-send"><i className="fa fa-location-arrow" style={{fontSize: "30px", paddingRight: "10px"}} /></button>

        <input style={{ display: "none" }} type="file" accept="image" onChange={this.uploadImageHandler} id="icon-button-file" />
        <label htmlFor="icon-button-file" style={{float:"right"}}>
        <i className="fa fa-camera-retro" style={{fontSize: "30px"}} />
        </label>
        
        {/* {uploadedFiles && (
          <div>
            <h3>Uploaded file(s):</h3>
            {map(uploadedFiles, (file, key) => (
              <div key={file.name + key}>
                <span>{file.name}</span>
                <button onClick={() => onFileDelete(file, key)}>Delete File</button>
              </div>
            ))}
          </div>
        )} */}
      </div>
    )
  }
}

export default enhance(SendMessages)
// export default connect((state) => ({
//   profile: state.firebase.profile,
//   auth: state.firebase.auth
// }))(withFirebase(SendMessages))
