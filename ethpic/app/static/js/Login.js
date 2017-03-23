import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import '../css/Login.css'

// Main app
var Login = React.createClass({

  handleSubmit(user,pswd) {
    this.doLogin(user , pswd);                                   //remove this
    this.setState({
      isVisible: false
    }, function() {
    });
    return false;
  },
  handleRemount(e) {
    this.setState({
      isVisible: true
    }, function() {
    });
    e.preventDefault();
  },
  cancelLogin(){
    this.props.cancelLogin();
  },
  doLogin(user,pswd){
    this.props.doLogin(user,pswd);
  },
  render() {

    // const for React CSS transition declaration
    let component = this.props.requestLogin ? <Modal onSubmit={ this.handleSubmit } cancelLogin={this.cancelLogin} key='modal'/> : <div></div>;

    return <div><ReactCSSTransitionGroup transitionName="animation" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
             { component }
           </ReactCSSTransitionGroup></div>
  }
})

// Modal
var Modal = React.createClass({
  getInitialState(){
    return{
      username:'',
      password:''
    }
  },

  render() {
    return <div className="overlay" onClick={this.props.cancelLogin}>
              <div className='Modal' onClick={this.stopPropagation}>
                <Logo />
                <form onSubmit={this.onSubmit}>
                  <div className='Input'>
                    <input type='text' name='username' ref='username' placeholder='Username' required autocomplete='false' onChange={this.usernameUpdate}/>
                  </div>
                  <div className='Input'>
                    <input type='password' name='password' ref='password' placeholder='Password' required autocomplete='false' onChange={this.passwordUpdate}/>
                  </div>
                  <button> SIGN IN</button>
                </form>
              </div>
           </div>
  },
  onSubmit(e){
      e.preventDefault();
      var user = this.refs.username.value.trim();
      var pswd = this.refs.password.value.trim();
      this.props.onSubmit(user , pswd)
  },
  stopPropagation(e){
      e.stopPropagation();
  },
  usernameUpdate(){
    this.setState({username: this.refs.username.value.trim()});
  },
  passwordUpdate(){
    this.setState({password: this.refs.password.value.trim()});
  }
})

// Generic input field
class Input extends React.Component {
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } ref={this.props.name} placeholder={ this.props.placeholder } required autocomplete='false'/>
           </div>
  }

}

// Fake logo
class Logo extends React.Component {
  render() {
    return <div className="logo">
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
              <span> Welcome! </span>
            </div>
  }
}

export default Login;
