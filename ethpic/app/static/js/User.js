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
                          <a href="#" onClick={this.showDash}><span style={{float:'left', 'font-size':'1.75rem', margin:'0 5px 0 -40px'}}>{this.props.userName}</span><i className="large material-icons">dashboard</i></a>
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
    }
})

export default User;
