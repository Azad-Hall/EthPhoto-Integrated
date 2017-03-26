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
        {this.props.loggedIn ? <UploadButton showUploader={this.state.showUploader} 
                                              toggleShowUpload={this.toggleShowUpload} 
                                              user={this.props.user} 
                                              curLat={this.props.curLat} 
                                              curLng={this.props.curLng}
                                               /> : <div></div>}
      </div>
    )
  },

  toggleShowUpload(){
    this.setState({showUploader: this.state.showUploader ? false : true})
  }
})

export default Upload;
