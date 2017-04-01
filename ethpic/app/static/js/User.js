import React from 'react';

var User = React.createClass({

    getInitialState(){
        return{
        }
    },

    render(){
        return(
            <div>
                <ul className="right">
                    <li>
                        {this.props.loggedIn ?
                          <a href="#" onClick={this.showDash}><i className="large material-icons">dashboard</i></a>
                          :<a href="#" onClick={this.showLogin}><i className="large material-icons">perm_identity</i></a>}
                    </li>
                </ul>
            </div>
        );
    },

    showLogin(){
      this.props.showLogin();
    },
    showDash(){
      this.props.showDash();
      // this.props.showUserPics();
    }
})

export default User;
