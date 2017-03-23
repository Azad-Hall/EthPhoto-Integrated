import {
  default as React,
  Component,
} from "react";

import CSSTransitions from 'react-addons-css-transition-group';

import update from "react-addons-update";

import SimpleMap from "./SimpleMap";

const imageArray = []

const styles={
  transition: 'all 150ms ease-out'
}

export default class Map extends Component {
  state = {
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
    }],
    imageView:{
      visible: false,
      url:'https://unsplash.it/800/800?image=234',
      title:'Image Title',
      tags:['tag1', 'tag2' , 'tag3' ],
    },
    formValue: "",
  };

  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);
  // this.handleChange = this.handleChange.bind(this);
  // this.updatingContent = this.updatingContent.bind(this);
  handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
  closeImageView = this.closeImageView.bind(this);

  componentDidMount() {

  }



  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    this.setState({
      markers: this.state.markers.map(marker => {
        marker.showInfo = false
        return marker;
      }),
    })
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          showInfo: false,
          imageUrl: 'https://unsplash.it/800/800?image='+[Math.floor(Math.random() * 1000)],
          content: true,
          title:'Image Title',
          tags:['tag1', 'tag2' , 'tag3' ],
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
    console.log(markers);
  }

  // handleChange(event){
  //   this.setState({formValue:event.target.value});
  // }

  handleMarkerClick(targetMarker){
    let tempState = this.state;
    this.state.markers.map(marker => {
        if(marker === targetMarker){
          console.log(marker.imageUrl);
          tempState.imageView.url = marker.imageUrl;
          tempState.imageView.title = marker.title;
          tempState.imageView.tags = marker.tags;
          tempState.imageView.visible = true;
          this.setState({tempState});
        }
    })
  }

  handleMarkerClose(targetMarker){
    console.log('called');
    this.setState({
      markers: this.state.markers.map(marker => {
        if(marker === targetMarker) {
          marker.showInfo = false
        }
        return marker;
      }),
    })
  }


  handleMarkerRightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  closeImageView(){
    let imageView = this.state;
    imageView.imageView.visible = false;
    this.setState({ imageView });
  }
  render() {
    return (
      <div>
      <SimpleMap
        markers={this.state.markers}
        onMapClick={this.handleMapClick}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
        onMarkerRightclick={this.handleMarkerRightclick}
        imageView = {this.imageView}
      />

      <ImageView data={this.state.imageView} closeImageView={this.closeImageView}/>
      </div>
    );
  }
}

var ImageView = React.createClass({
  render(){
    return(
      <div>
        <CSSTransitions
          transitionName = 'fade'
          transitionEnterTimeout = {150}
          transitionLeaveTimeout = {150}
          transitionAppear = {true}
          transitionAppearTimeout = {150}>
        {this.props.data.visible ?
          <div className="overlay" onClick={this.props.closeImageView} key={1}>
            <div className="container center-position">
              <div className="row">
                <div className="col m12 l6 offset-l3">
                  <div className="card">
                   <div className="card-image">
                     <img src={this.props.data.url} />
                     <span className="card-title">{this.props.data.title}</span>
                     <a className="btn-floating halfway-fab waves-effect waves-light red" href={this.props.data.url} download=" " onClick={(e) => {e.stopPropagation();}}><i className="material-icons">play_for_work</i></a>
                   </div>
                   <div className="card-content">
                     {this.props.data.tags.map(tag => {
                      return(
                        <div className="chip" key={tag}>
                          #{tag}
                        </div>
                      )
                    })}
                   </div>
                 </div>
               </div>
             </div>
           </div>
          </div>
          :<div></div>
         }
         </CSSTransitions>
       </div>
    )
  }
})
