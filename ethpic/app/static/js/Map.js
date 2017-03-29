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
    markers: [],
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
  handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
  closeImageView = this.closeImageView.bind(this);

  componentDidMount() {
    console.clear();
    console.log(this.state.markers);
    this.setState({markers: this.props.markerData});
    console.log(this.state.markers);
    console.log(this.props.markerData);

    var types = {1: "Landscape", 2: "People", 3: "Architecture"};

    console.log("1", this.state);
    var that = this;

    var h = ethDB.getNumberOfUsers().then(function(users){
      console.log("USERS", users);
      console.log("2", that.state);

      for (var i = 1; i <= users; i++) {
        var curr = i;
        ethDB.getNumberOfPhotosByUID(i).then(function(photos){
          console.log("PHOTOS", photos);
          console.log("3", that.state);

          for (var j = 0; j < photos; j++) {

            console.log(curr, j);
            ethDB.getPhotoByUID(curr, j).then(function(data){

              console.log(data);
              console.log(data[2], data[3]);
              var obj = {};
              obj.lng = () => {return parseInt(data[2])};
              obj.lat = () => {return parseInt(data[3])};

              console.log(obj);
              console.log("Till here 1");
              that.props.setCurLatLng(obj);
              that.setState({
                markers: that.state.markers.map(marker => {
                  marker.showInfo = false
                  return marker;
                }),
              });
              let { markers } = that.state;
              markers = update(markers, {
                $push: [
                  {
                    position: {
                      lng: parseInt(data[2]),
                      lat: parseInt(data[3])
                    },
                    defaultAnimation: 2,
                    showInfo: false,
                    imageUrl: EmbarkJS.Storage.getUrl(data[1]),
                    content: true,
                    title:'Image Title',
                    tags:[types[parseInt(data[4])]],
                    key: data[0], // Add a key property for: http://fb.me/react-warning-keys
                  },
                ],
              });
              that.setState({ markers });
              that.props.updateMarkers(that.state.markers);
              that.setState({markers: that.props.markerData});
              console.log(markers);
            });
          }
        });
      }
    });
  }


  componentWillReceiveProps() {
    this.setState({markers: this.props.markerData});
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    console.log(event.latLng);
    this.props.setCurLatLng(event.latLng);
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
    this.props.updateMarkers(this.state.markers);
    this.setState({markers: this.props.markerData});
    console.log(markers);
  }

  updateMarkers(){
   console.log('11111');
   this.props.updateMarkers(this.state.markers);
   this.setState({markers: this.props.markerData});  
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
          console.log('-----------------------');
          console.log(marker.tags);
          tempState.imageView.visible = true;
          this.setState({tempState});
        }
    })
    this.props.updateMarkers(this.state.markers);
    this.setState({markers: this.props.markerData});
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
    this.props.updateMarkers(this.state.markers);
    this.setState({markers: this.props.markerData});
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
    this.props.updateMarkers(this.state.markers);
    this.setState({markers: this.props.markerData});
  }

  closeImageView(){
    let imageView = this.state;
    imageView.imageView.visible = false;
    this.setState({ imageView });
  }

  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);

  handleSearchBoxMounted(searchBox) {
   this._searchBox = searchBox;
 }

 handlePlacesChanged() {
   const places = this._searchBox.getPlaces();

   // Add a marker for each place returned from search bar
   const markers = places.map(place => ({
     position: place.geometry.location,
   }));

   // Set markers; set map center to first search result
   const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

   this.setState({
     center: mapCenter,
     markers,
   });
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
        onSearchBoxMounted = {this.handleSearchBoxMounted}
        bounds = {this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
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
