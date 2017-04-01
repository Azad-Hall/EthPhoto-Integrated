import React from 'react';
// import './Gallery.css';
import CSSTransitions from 'react-addons-css-transition-group';
import $ from './jquery';

const styles={
  transition: 'all 300ms ease'
}

var Gallery = React.createClass  ({
  getInitialState(){
    return{
      data : [],
      pic: 0,
      coin: 0,
      open: false
    }
  },




  componentDidMount() {
  	console.log("STATE:", this.state.data);
  	this.setState({ data: this.props.data });
  	// this.updateValues();
  	if (this.props.open) {
      this.props.updateValues();
  		this.props.showUserPics();
  	}
  },

  componentWillReceiveProps() {
    this.setState({ data: this.props.data });

    if (this.props.open) {
      // this.updateValues();
      // this.state.open = this.props.open;
      // this.updateValues();
  		// this.props.showUserPics();
  	}
  },

  onDelete(id) {
  	// e.preventDefault();
  	var that = this;
    console.log('id',id);
    this.props.functionCall('0x'+that.props.addresses[0],'deletePhoto',[parseInt(id)],function(err, success){
  		console.log(success);
  		that.props.showUserPics();
      that.props.updateValues();
      that.props.hideDash();
  	});
  },


	render() {
		return (
      <div>
	      <CSSTransitions
	          transitionName = 'slide'
	          transitionEnterTimeout = {300}
	          transitionLeaveTimeout = {300}
	          transitionAppear = {true}
	          transitionAppearTimeout = {300}>
	      { this.props.open ?
	        <div style={{backgroundColor:'#131829', width:'100w', position:'absolute', overflowY:'scroll', top:'0', bottom:'0',left:'0',right:'0'}} onClick={this.props.hideDash} key='gallery'>
            <div style={{width:'70vw' , margin:'0 auto', background:'#131829'}}>
             <Tiles data={this.state.data} logout={this.props.logout} username={this.props.username}
	  			   onDelete={this.onDelete} pic={this.props.pic} coin={this.props.coin} addresses={this.props.addresses} ether={this.props.ether}/>
           </div>
	        </div>
	        :<div></div>}

	      </CSSTransitions>
      </div>

		);
	}
})

var Tiles = React.createClass({
	render() {
		// Create tile for each item in data array
		// Pass data to each tile and assign a key
		return (
			<div className="tiles">
        <UserInfo logout={this.props.logout} username={this.props.username} pic={this.props.pic} coin={this.props.coin} ether={this.props.ether} addresses={this.props.addresses}/>
        <div className="imgContainer" onClick={this.stopPropagation}>
  				{this.props.data.map((data) => {
  					return <Tile data={data} key={data.id} onDelete={this.props.onDelete}/>
  				})}
  			</div>
      </div>
		);
	},

  stopPropagation(e){
    e.stopPropagation();
  }
})

var UserInfo = React.createClass({
  render(){
    return(
      <div className="userData" onClick={this.stopPropagation}>
        <a className="row" href="#" onClick={this.props.logout}><i className="col s4 material-icons">phonelink_erase</i></a>
        <div className="row" style={{padding:'5%'}}>
	        <div className='user-data col s4'>
	        	<img src='./eth.png'/>
	        	<span>Eth</span>
	        	<span id='Eth'>{this.props.ether}</span>
	        </div>
	        <div className='user-data col s4'>
	        	<img src='./coin.png'/>
	        	<span>Coin</span>
	        	<span id='Coin'>{this.props.coin}</span>
	        </div>
	        <div className='user-data col s4'>
	        	<img src='./photo.png'/>
	        	<span>Pic</span>
	        	<span id='Pic'>{this.props.pic}</span>
	        </div>
        </div>
        <div>
          <h5>{this.props.addresses}</h5>
        </div>
        <hr/>
      </div>
    )
  },

  stopPropagation(e){
    e.stopPropagation();
  }
})

class Tile extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				open: false,
				mouseOver: false
			};
			// Bind properties to class instance
			this._clickHandler = this._clickHandler.bind(this);
			this._mouseEnter = this._mouseEnter.bind(this);
			this._mouseLeave = this._mouseLeave.bind(this);
		}
		// Event handlers to modify state values
	_mouseEnter(e) {
		e.preventDefault();
		if (this.state.mouseOver === false) {
			this.setState({
				mouseOver: true
			})
		}
	}
	_mouseLeave(e) {
		e.preventDefault();
		if (this.state.mouseOver === true) {
			this.setState({
				mouseOver: false
			})
		}
	}
	_clickHandler(e) {
		e.preventDefault();
    e.stopPropagation();
		if (this.state.open === false) {
			this.setState({
				open: true
			});
		} else {
			this.setState({
				open: false
			});
		}
	}

  onDelete(id) {
    console.log('id', id);
    this.props.onDelete(id);
  }

	render() {
		// Modify styles based on state values
		let tileStyle = {};
		let headerStyle = {};
		let zoom = {};
		// When tile clicked
		if (this.state.open) {
			tileStyle = {
				'max-width': '80vh',
				'max-height': '80vh',
				position: 'fixed',
				top: '50%',
				left: '50%',
				margin: '0',
        		transform:'translate( -50% , -50% )',
				boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
        		zIndex : 2
			};
		} else {
			tileStyle = {
				width: '18vw',
				height: '18vw'
			};
		}

		return (
			<div className="tile">
				<img
					onMouseEnter={this._mouseEnter}
					onMouseLeave={this._mouseLeave}
					onClick={this._clickHandler}
					src={this.props.data.image}
					alt={this.props.data.name}
					style={tileStyle}
				/>
				<a href="#" onClick={() => this.onDelete(this.props.data.id)} style={{position:'absolute', marginLeft:'-3vw' , marginTop:'1vw' , color:'white'}}><i className="material-icons">delete</i></a>
			</div>
		);
	}
}

export default Gallery;
