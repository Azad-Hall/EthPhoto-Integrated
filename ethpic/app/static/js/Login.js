import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import './Login.css'

// Main app
var Login = React.createClass({

  handleSubmit(user,pswd,login) {
    console.log('user: ', user , 'pswd: ', pswd);
    if(login)
      this.doLogin(user , pswd);                                   //remove this
    else
      this.doSignUp(pswd);

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

  doSignUp(pswd){
    this.props.doSignUp(pswd);
  },

  render() {

    // const for React CSS transition declaration
    let component = this.props.requestLogin ? <Modal ipfs={this.props.ipfs} ethereum={this.props.ethereum} setIPs={this.props.setIPs} onSubmit={ this.handleSubmit } cancelLogin={this.cancelLogin} key='modal'/> : <div></div>;

    return <div><ReactCSSTransitionGroup transitionName="" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
             { component }
           </ReactCSSTransitionGroup></div>
  }
})

// Modal
var Modal = React.createClass({
  getInitialState(){
    return{
      username:'',
      password:'',
      choose:0,
      signup:0,
      signin:0,
      chooseip:0
    }
  },

  inClick(e){
    if(this.state.choose == 0){
      e.preventDefault();
      this.setState({choose : 1, signin: 1, chooseip: 0})
    }
  },
  upClick(e){
    if(this.state.choose == 0){
      e.preventDefault();
      this.setState({signup : 1, choose:1, chooseip: 0})
    }
  },
  changeIp(e){
    if(this.state.choose == 0){
      e.preventDefault();
      this.setState({signup : 0, choose:1, chooseip: 1, signin: 0})
    } else {
      e.preventDefault();
      var ipfsIP = this.refs.ipfs.value.trim();
      var ethIP = this.refs.eth.value.trim();
      this.props.setIPs(ipfsIP, ethIP);
    }
  },

  render() {
    return <div className="overlay" onClick={this.props.cancelLogin}>
              <div className='Modal' onClick={this.stopPropagation}>
              {this.state.choose ? <span style={{color:'white', position:'absolute', right:'1vw', top:'1vh', cursor:'pointer'}} onClick={() => this.setState({signup : 0, choose:0, signin:0, chooseip:0})}>&larr;</span> : <span></span>}
                <Logo />
                <form onSubmit={this.onSubmit}>
                  { this.state.signin ?
                    <div className='Input'>
                      <input type='text' name='username' ref='username' placeholder='Words' required autocomplete='false' onChange={this.usernameUpdate}/>
                    </div> : <div></div>
                  }
                  {this.state.choose && !this.state.chooseip ?
                    <div className='Input'>
                     <input type='password' name='password' ref='password' placeholder='Password' required autocomplete='false' onChange={this.passwordUpdate}/>
                    </div>:<div></div>
                  }
                  {this.state.chooseip ?
                    <div>
                    <div className='Input'>
                     <input type='text' name='ipfs' ref='ipfs' placeholder='Enter IPFS address'  defaultValue={this.props.ipfs} required autocomplete='false'/>
                    </div>
                    <div className='Input'>
                     <input type='text' name='eth' ref='eth' placeholder='Enter Ethereum address' defaultValue={this.props.ethereum} required autocomplete='false'/>
                    </div></div>:<div></div>
                  }
                  {this.state.choose == 0 ? <button onClick={this.upClick}> SIGN UP </button> : <div></div>}
                  {!this.state.chooseip ? <button onClick={this.inClick}> SIGN {this.state.signup ? 'UP' : 'IN'} </button> : <div></div>}
                  {this.state.choose == 0 || this.state.chooseip ? <button onClick={this.changeIp}> CHANGE IP </button> : <div></div>}

                  {this.state.signup ?
                    <span style={{color:'white',fontSize:'0.9rem', margin:'0 10%', display:'block', textAlign:'center'}}>Take note of the words that will be generated when you submit your password. You will need them to be able to sign in to your account in the future.</span>
                    :<span></span>
                  }
                </form>
              </div>
           </div>
  },
  onSubmit(e){
      e.preventDefault();
      let signin = this.state.signin;
      let user;
      if(signin)
        user = this.refs.username.value.trim();
      let pswd;
        pswd = this.refs.password.value.trim();
      this.props.onSubmit(user , pswd , signin);
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
              <input type={ this.props.type } name={ this.props.name } ref={this.props.name} placeholder={ this.props.placeholder } autocomplete='false'/>
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
