import React from 'react';
import Uploader from './Uploader';
import fetch from "isomorphic-fetch";
import CSSTransitions from 'react-addons-css-transition-group';
import $ from './jquery';

if (!window.fetch) window.fetch = fetch;

const ButtonStyle = {
  position: 'absolute',
  right : '3vw',
  bottom: '2vh',
  zIndex: '10'
}
const ContainerStyle = {
  position: 'absolute',
  top: '0px',
  bottom: '0',
  left: '0',
  right: '0',
  background: '#131829',
  overflow: 'hidden'
}

const styles={
  transition: 'all 300ms ease'
}

var UploadButton = React.createClass({
  getInitialState(){
    return{
      rotate:0,
      first:true
    }
  },

  componentWillReceiveProps(){
    // this.setState({ rotate: this.props.showUploader ? '45deg' : 0});
    // this.state.rotate = this.props.showUploader ? '45deg' : 0;
    // if(this.state.first){
    //   this.state.rotate = 0;
    //   this.state.first = false;
    // }
  },

  render(){
    return(
      <div>
        <div onClick={this.props.toggleShowUpload}><a className="btn-floating btn-large waves-effect waves-light indigo" style={ButtonStyle}><i className="material-icons" style={{...styles, transform:'rotate('+this.state.rotate+')'}}>add</i>}</a></div>
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
                                                                                            setCurLatLng={this.props.setCurLatLng}
                                                                                            showUserPics={this.props.showUserPics}
                                                                                            addresses={this.props.addresses}
                                                                                            functionCall={this.props.functionCall}
                                                                                            updateValues={this.props.updateValues}
                                                                                            ipfs={this.props.ipfs}
                                                                                            ethereum={this.props.ethereum}
                                                                                            toggleShowUpload={this.props.toggleShowUpload} /></div> : <div></div>}
        </CSSTransitions>
      </div>
    )
  }
})

export default UploadButton;
