import React from 'react';
import User from './User';
// import '../css/Navbar.css';

var Navbar = React.createClass({
  render(){
    return(
      <nav className="teal" id="navbar">
          <div className="nav-wrapper">
              <a href="#" className="brand-logo center"><div className="logo" style={{ float:'left', zoom:0.25, margin:'10px 50px'}}>
                        <div className="camera">
                          <div className="circle one"></div>
                          <div className="circle two"></div>
                          <div className="circle three"></div>
                          <div className="circle four"></div>
                          <div className="circle five"></div>
                          <div className="circle six"></div>
                          <div className="circle seven"></div>
                          <div className="circle eight"></div>
                          <div className="circle nine"></div>
                          <div className="circle ten"></div>
                          <div className="line"></div>
                        </div>
                      </div>EthPhoto</a>
              <ul className="left">
              </ul>
              <User showUserPics={this.props.showUserPics} loggedIn={this.props.loggedIn} showLogin={this.props.showLogin} showDash={this.props.showDash} userName={this.props.userName}/>
          </div>
      </nav>
    )
  }
})

export default Navbar;
