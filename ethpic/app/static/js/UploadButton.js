import React from 'react';
import Uploader from './Uploader';
import fetch from "isomorphic-fetch";
import CSSTransitions from 'react-addons-css-transition-group';

if (!window.fetch) window.fetch = fetch;

const ButtonStyle = {
  position: 'absolute',
  right : '3vw',
  bottom: '2vh',
  zIndex: '10'
}
const ContainerStyle = {
  position: 'absolute',
  top: '60px',
  bottom: '0',
  left: '0',
  right: '0',
  background: '#eee',
  overflowX: 'hidden'
}

const styles={
  transition: 'all 300ms ease'
}

var UploadButton = React.createClass({
  render(){
    return(
      <div>
        <a className="btn-floating btn-large waves-effect waves-light indigo" style={ButtonStyle} onClick={this.props.toggleShowUpload}><i className="material-icons">add</i></a>
        <CSSTransitions
          transitionName = 'slide'
          transitionEnterTimeout = {300}
          transitionLeaveTimeout = {300}
          transitionAppear = {true}
          transitionAppearTimeout = {300}>
        {this.props.showUploader ? <div style={ContainerStyle} key={'uploader'} ><Uploader  user={this.props.user}
                                                                                            curLat={this.props.curLat} 
                                                                                            curLng={this.props.curLng}
                                                                                            markerData={this.props.markerData} 
                                                                                            updateMarkers={this.props.updateMarkers}
                                                                                            setCurLatLng={this.props.setCurLatLng} /></div> : <div></div>}
        </CSSTransitions>
      </div>
    )
  }
})

export default UploadButton;
