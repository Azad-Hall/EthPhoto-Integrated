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
      userName: 'a'
    }
  },

  render() {
    return (
      <div className="App">
        <Navbar loggedIn={this.state.loggedIn} showLogin={this.showLogin}  showDash={this.showDash} userName={this.state.userName}/>
        <Login requestLogin={this.state.requestLogin} cancelLogin={this.cancelLogin} doLogin={this.doLogin}/>
        <Map/>
        <Gallery open={this.state.dashOpen} hideDash={this.hideDash} logout={this.logout} username={this.state.userName}/>
        <Upload loggedIn={this.state.loggedIn}/>
      </div>
    );
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
    this.setState({dashOpen:true});
  },

  hideDash(){
    this.setState({dashOpen:false});
  },

  logout(){
    this.setState({dashOpen: false, loggedIn: false});
  }

})

export default App;
