import React from 'react';

var Loader = React.createClass({render(){
    return(
      <div>
        {this.props.showLoader ?
          <div className='overlay' style={{background:' #131829', zIndex:'110'}}>
            <div className="loader">
              <div className="inner">
              </div>
            </div>
            <h4 style={{color:'white', fontSize:22, position:'absolute', top:'calc(50% + 60px)', left:'50%', transform:'translate(-50%)', zIndex:'110'}}>Pending Transaction...</h4>
          </div> : <div></div>
        }
      </div>
    )
  }
});

export default Loader;
