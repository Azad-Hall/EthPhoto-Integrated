import React from 'react';
import UploadButton from './UploadButton';

var Upload = React.createClass({
  getInitialState(){
    return{
      showUploader : true
    }
  },

  render(){
    return(
      <div>
        {this.props.loggedIn ? <UploadButton showUploader={this.state.showUploader} toggleShowUpload={this.toggleShowUpload}/> : <div></div>}
      </div>
    )
  },

  toggleShowUpload(){
    console.log(this.state.showUploader);
    this.setState({showUploader: this.state.showUploader ? false : true})
    console.log(this.state.showUploader);
  }
})

export default Upload;
