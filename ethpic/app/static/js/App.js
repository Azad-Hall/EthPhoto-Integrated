import React from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Gallery from './Gallery';
import Map from './Map';
import Upload from './Upload'

var App = React.createClass ({
  getInitialState(){
    return{
      loggedIn: true,
      requestLogin: false,
      dashOpen: false,
      uploaderOpen: false,
      userName: 'User',
      curLat : 22,
      curLng : 87,
      markers: [{
        position: {
          lat: 22.314544,
          lng: 87.309068,
        },
        key: `IIT KGP`,
        content: false,
        showInfo: false,
        defaultAnimation: 2,
        imageUrl:'https://unsplash.it/800/800?image=234',
        title:'Image Title',
        tags:['tag1', 'tag2' , 'tag3' ],
      }]
    }
  },
  render() {
    return (
      <div className="App">
        <Navbar loggedIn={this.state.loggedIn} showLogin={this.showLogin}  showDash={this.showDash} userName={this.state.userName}/>
        <Login requestLogin={this.state.requestLogin} cancelLogin={this.cancelLogin} doLogin={this.doLogin}/>
        <Map markerData={this.state.markers} setCurLatLng={this.setCurLatLng} updateMarkers={this.updateMarkers}/>
        <Gallery open={this.state.dashOpen} hideDash={this.hideDash} logout={this.logout} username={this.state.userName}/>
        <Upload markerData={this.state.markers} updateMarkers={this.updateMarkers} setCurLatLng={this.setCurLatLng} toggleShowUpload={this.toggleShowUpload} showUpload={this.state.uploaderOpen} loggedIn={this.state.loggedIn} user={this.state.userName} curLat={this.state.curLat} curLng={this.state.curLng}/>
      </div>
    );
  },

  updateMarkers(marker){
    this.setState({markers:marker});
    console.log('marker data from app:');
    console.log(this.state.markers);
  },

  toggleShowUpload(){
    this.setState({uploaderOpen: this.state.uploaderOpen ? false : true, dashOpen: false})
  },

  setCurLatLng(point){
    this.setState({curLng: point.lng(), curLat: point.lat()});
  },

  showLogin(){
    this.setState({requestLogin:true});
  },

  cancelLogin(){
    this.setState({requestLogin:false});
  },

  doLogin(user,pswd){
    console.log();

    if(!user || !pswd){
      alert('Enter Username & Password');
      return;
    }

    this.setState({requestLogin:false, loggedIn: true, userName: user});
  },

  showDash(){
    this.setState({dashOpen:true, uploaderOpen:false});
  },

  hideDash(){
    this.setState({dashOpen:false});
  },

  logout(){
    this.setState({dashOpen: false, loggedIn: false});
  }

})

export default App;
