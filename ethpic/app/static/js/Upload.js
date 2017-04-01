import React from 'react';
import UploadButton from './UploadButton';

var Upload = React.createClass({
  getInitialState(){
    return{
    }
  },

  render(){
    return(
      <div>
        {this.props.loggedIn ? <UploadButton showUploader={this.props.showUpload}
                                              toggleShowUpload={this.props.toggleShowUpload}
                                              user={this.props.user}
                                              curLat={this.props.curLat}
                                              curLng={this.props.curLng}
                                              markerData={this.props.markerData}
                                              updateMarkers={this.props.updateMarkers}
                                              setCurLatLng={this.props.setCurLatLng}
                                              showUserPics={this.props.showUserPics}
                                              addresses={this.props.addresses}
                                              functionCall={this.props.functionCall}
                                              updateValues={this.props.updateValues}
                                              ipfs={this.props.ipfs}
                                              ethereum={this.props.ethereum} 
                                               /> : <div></div>}
      </div>
    )
  }
})

export default Upload;
