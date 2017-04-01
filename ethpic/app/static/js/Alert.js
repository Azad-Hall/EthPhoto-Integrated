import React from 'react';

var Alert = React.createClass({
  render(){
    return(
      <div>{this.props.showAlert ?
      <div className='overlay'>
        <div style={{position:'absolute', top:'30%', left:'50%', background:'#131829', padding:'10px 10px 20px', borderRadius:'5px', transform:'translate(-50%,-60%)', color:'white', minHeight:'100px', minWidth:'200px'}}>
          <div style={{margin:'10px', borderRadius:'5px', border:'solid white 1px', padding:'20px'}}>
            <h4 style={{color:'grey', fontSize:'20px'}}>Take note of these words. You will need them to be able to sign in to your account in the future.</h4>
            <h4 style={{textAlign:'center'}}>{this.props.info}</h4>

            <button className="btn" onClick={this.props.done} style={{background:'#2670a6', position:'absolute', left:'50%', transform:'translate(-50%,0%)'}}>I have copied it</button>
          </div>
        </div>
      </div>:<div></div>}
      </div>
    )
  }
})

export default Alert;
