import {
  default as React,
  Component,
} from "react";

// const server_side = "http://139.59.72.137:8080/ipfs/";

import CSSTransitions from 'react-addons-css-transition-group';

import update from "react-addons-update";

import SimpleMap from "./SimpleMap";
import Web3 from 'web3';
import $ from './jquery';

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
      title:'',
      tags:['tag1', 'tag2' , 'tag3' ],
      upvotes:''
    },
    images: [],
    currentMarker: '',
    formValue: "",
    counter: 0
  };

  // handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);
  // handleMarkerRightclick = this.handleMarkerRightclick.bind(this);
  closeImageView = this.closeImageView.bind(this);
  upvoteImage = this.upvoteImage.bind(this);
  incCnt = this.incCnt.bind(this);
  decCnt = this.decCnt.bind(this);
  filterTopics = this.filterTopics.bind(this);
  
  componentDidMount() {
    console.log(this.state.markers);
    this.setState({markers: this.props.markerData});
    console.log(this.state.markers);
    console.log(this.props.markerData);

    var types = {
      1: "Art/Achitecture",
      2: "People",
      3: "Technology",
      4: "Travel",
      5: "Nature",
      6: "Abstract",
      7: "Object",
      8: "Other"
    };


    console.log("1", this.state);
    var that = this;

    ethDB.web3.setProvider(new Web3.providers.HttpProvider(that.props.ethereum));
    var h = ethDB.getNumberOfUsers().then(function(users){
      console.log("USERS", users);
      console.log("2", that.state);

      var arr = [...Array(users.c[0]).keys()];
      console.log(arr);


      arr.forEach(function(listitem, curr){

        curr = curr + 1;

        ethDB.getNumberOfPhotosByUID(curr).then(function(photos){
          console.log("PHOTOS", photos);
          console.log("3", that.state);

          var new_arr = [...Array(photos.c[0]).keys()];
          console.log(new_arr);

          new_arr.forEach(function(new_listitem, j) {


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
                      lng: parseInt(data[2])/10000,
                      lat: parseInt(data[3])/10000
                    },
                    defaultAnimation: 2,
                    showInfo: false,
                    imageUrl: that.props.ipfs + '/ipfs/' + data[1],
                    content: true,
                    title:'',
                    userid: curr,
                    imageid: j,
                    tags:[types[parseInt(data[4])]],
                    key: data[0], // Add a key property for: http://fb.me/react-warning-keys
                    upvotes: [parseInt(data[5])],
                  },
                ],
              });
              that.setState({ markers });
              that.props.updateMarkers(that.state.markers);
              that.setState({markers: that.props.markerData});
              console.log(markers);
            });
          });
        });

      });
    });
  }


  componentWillReceiveProps() {
    this.setState({markers: this.props.markerData});
    let tempState = this.state;
    tempState.imageView.upvotes = this.props.markerData.upvotes;
    this.props.markerData.map(marker => {
      if(marker === this.state.currentMarker){
        tempState.imageView.upvotes = marker.upvotes;
        console.log(marker.upvotes);
      }
    })
    this.setState({tempState});
    if (!this.state.markers.length && !this.props.markerData.length) {

      console.log("DOUBLE DOUBLE", this.state.markers.length , this.props.markerData.length);

      var types = {
        1: "Art/Achitecture",
        2: "People",
        3: "Technology",
        4: "Travel",
        5: "Nature",
        6: "Abstract",
        7: "Object",
        8: "Other"
      };

      console.log("1", this.state);
      var that = this;

      ethDB.web3.setProvider(new Web3.providers.HttpProvider(that.props.ethereum));
      var h = ethDB.getNumberOfUsers().then(function(users){
        console.log("USERS", users);
        console.log("2", that.state);

        var arr = [...Array(users.c[0]).keys()];
        console.log(arr);


        arr.forEach(function(listitem, curr){

          curr = curr + 1;

          ethDB.getNumberOfPhotosByUID(curr).then(function(photos){
            console.log("PHOTOS", photos);
            console.log("3", that.state);

            var new_arr = [...Array(photos.c[0]).keys()];
            console.log(new_arr);

            new_arr.forEach(function(new_listitem, j) {


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
                        lng: parseInt(data[2])/10000,
                        lat: parseInt(data[3])/10000
                      },
                      defaultAnimation: 2,
                      showInfo: false,
                      imageUrl: that.props.ipfs + '/ipfs/' + data[1],
                      content: true,
                      title:'',
                      userid: curr,
                      imageid: j,
                      tags:[types[parseInt(data[4])]],
                      key: data[0], // Add a key property for: http://fb.me/react-warning-keys
                      upvotes: [parseInt(data[5])],
                    },
                  ],
                });
                // if (!that.state.markers.length && !that.props.markerData.length) {
                  that.setState({ markers });
                  that.props.updateMarkers(that.state.markers);
                  that.setState({markers: that.props.markerData});
                  console.log(markers);
                // }

              });
            });
          });

        });
      });
    }
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
    console.log(this.state.imageView.upvotes);
    let tempState = this.state;
    tempState.images = [];
    this.state.markers.map(marker => {
        console.log('-------compare-------');
        console.log(marker.position);
        console.log(targetMarker.position);
        console.log('---------------');
        if(marker.position.lat == targetMarker.position.lat && marker.position.lng == targetMarker.position.lng){
          tempState.images.push(marker);
          console.log('--------pushed-----');
          console.log(tempState.images);
          console.log('-------------');
          tempState.imageView.url = marker.imageUrl;
          tempState.imageView.title = marker.title;
          tempState.imageView.tags = marker.tags;
          tempState.imageView.visible = true;
          tempState.imageView.upvotes = marker.upvotes;
          tempState.counter = 0;
          console.log(marker.upvotes);
          console.log(tempState.imageView.upvotes);
          this.setState({tempState});
        }
    })
    this.setState({markers: this.props.markerData, currentMarker: targetMarker});
    this.props.updateMarkers(this.state.markers);
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


  // handleMarkerRightclick(index, event) {
  //   /*
  //    * All you modify is data, and the view is driven by data.
  //    * This is so called data-driven-development. (And yes, it's now in
  //    * web front end and even with google maps API.)
  //    */
  //   let { markers } = this.state;
  //   markers = update(markers, {
  //     $splice: [
  //       [index, 1],
  //     ],
  //   });
  //   this.setState({ markers });
  //   this.props.updateMarkers(this.state.markers);
  //   this.setState({markers: this.props.markerData});
  // }

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

 upvoteImage(e){
   e.preventDefault();
    e.stopPropagation();

    var that = this;
    var all_obj = [];

    let promises = this.state.markers.map(marker => {
      if(marker === that.state.currentMarker) {
        return that.props.functionCall(that.props.addresses[0],'upvote',[marker.userid, marker.imageid],function(err, success){
          console.log(success);
          marker.upvotes = parseInt(marker.upvotes) ? parseInt(marker.upvotes) + 1 : 1;
          that.closeImageView();
          return marker;
        });
      }
      else{
        return marker;
      }
    });

    Promise.all(promises)
      .then(results => {
        // Handle results
        console.log("UPVOTE", results);
        that.setState({ markers: results});
        this.props.updateMarkers(this.state.markers);
        this.setState({markers: this.props.markerData});
      })
      .catch(e => {
        console.error(e);
      })

    // this.setState({
    //   markers: this.state.markers.map(marker => {
    //     if(marker === this.state.currentMarker) {
    //       ethDB.upvote(marker.userid, marker.imageid).then(function(success){
    //         marker.upvotes = parseInt(marker.upvotes) ? parseInt(marker.upvotes) + 1 : 1
    //       });
    //     }
    //     return marker;
    //   }),
    // })

  }

  incCnt(){
    console.log(this.state.counter);
    var tempState = this.state;
    if(tempState.counter == (this.state.images.length -1) ){
      tempState.counter = 0;
    }else{
      tempState.counter++;
    }


    tempState.imageView.url = this.state.images[tempState.counter].imageUrl;
    tempState.imageView.title = this.state.images[tempState.counter].title;
    tempState.imageView.tags = this.state.images[tempState.counter].tags;
    tempState.imageView.visible = true;
    tempState.imageView.upvotes = this.state.images[tempState.counter].upvotes;


    this.setState({tempState});
  }

  decCnt(){
    var tempState = this.state;
    if(tempState.counter == 0 ){
      tempState.counter = this.state.images.length -1;
    }else{
      tempState.counter--;
    }


    tempState.imageView.url = this.state.images[tempState.counter].imageUrl;
    tempState.imageView.title = this.state.images[tempState.counter].title;
    tempState.imageView.tags = this.state.images[tempState.counter].tags;
    tempState.imageView.visible = true;
    tempState.imageView.upvotes = this.state.images[tempState.counter].upvotes;


    this.setState({tempState});
  }

  filterTopics(){
    var option = prompt("Please Choose Topic \n\t1.Art/Architecture\n\t2.People\n\t3.Technology\n\t4.Travel\n\t5.Nature\n\t6.Abstract\n\t7.Object\n\t8.Other", "Enter Choice Number");
    switch(option){
      case '1': {
        option = 'Art/Architecture';
        break;
      }
      case '2':{
        option = 'People';
        break;
      }
      case '3':{
        option = 'Technology';
        break;
      }
      case '4':{
        option = 'Travel';
        break;
      }
      case '5':{
        option = 'Nature';
        break;
      }
      case '6':{
        option = 'Abstract';
        break;
      }
      case '7':{
        option = 'Object';
        break;
      }
      case '8':{
        option = 'Other';
        break;
      }
      default:{
        alert('Enter a valid input.');
        return;
      }
    }
    console.clear();
    let tempState = this.state;
    tempState.images = [];
    this.state.markers.map(marker => {
        console.log('-------compare-------');
        console.log(marker.tags);
        console.log(option);
        console.log('---------------');
        if(marker.tags == option){
          tempState.images.push(marker);
          console.log('--------pushed-----');
          console.log(tempState.images);
          console.log('-------------');
          tempState.imageView.url = marker.imageUrl;
          tempState.imageView.title = marker.title;
          tempState.imageView.tags = marker.tags;
          tempState.imageView.visible = true;
          tempState.imageView.upvotes = marker.upvotes;
          tempState.counter = 0;
          console.log(marker.upvotes);
          console.log(tempState.imageView.upvotes);
          this.setState({tempState});
        }
    })
    this.setState({markers: this.props.markerData, currentMarker: targetMarker});
    this.props.updateMarkers(this.state.markers);
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
      <div onClick={this.filterTopics}><a className="btn-floating btn-large waves-effect waves-light indigo" style={{position:'absolute', bottom: '2vh', left:'3vh', zIndex:'10'}}><i className="material-icons" style={{...styles, transform:'rotate('+this.state.rotate+')'}}>clear_all</i>}</a></div>

      <ImageView data={this.state.imageView} counter={this.state.counter} incCnt={this.incCnt} decCnt={this.decCnt} closeImageView={this.closeImageView} upvoteImage={this.upvoteImage} images={this.state.images}/>
      </div>
    );
  }
}

var ImageView = React.createClass({

  next(e){
    console.log('next call');
    e.preventDefault();
    e.stopPropagation();
    // window.next();
    this.props.incCnt();
  },

  prev(e){
    console.log('prev call');
    e.preventDefault();
    e.stopPropagation();
    // window.prev();
    this.props.decCnt();
  },

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
          <button className="btn indigo" style={{position:'absolute', top:'50%' , zIndex:'200' , left:'75%', transform:'translate(-50%)'}} onClick={this.next}>&rsaquo;</button>
          <button className="btn indigo" style={{position:'absolute', top:'50%' , zIndex:'200' , left:'25%', transform:'translate(-50%)'}} onClick={this.prev}> &lsaquo;</button>


            <div className="container center-position">
              <div className="row">
                <div className="col m12 l6 offset-l3">
                  <div className="card">
                   <div className="card-image">
                     <img src={this.props.data.url} />
                     <span className="card-title">{this.props.data.title}</span>
                     <a className="btn halfway-fab waves-effect waves-light blue" style={{right:'2%', position:'absolute', transform:'translate( 0 , -50% )', borderRadius:'500px'}} onClick={this.props.upvoteImage}><i className="material-icons">thumb_up</i> {this.props.data.upvotes}</a>
                     <a className="btn-floating halfway-fab waves-effect waves-light red" style={{transform:'translate( -250% , 50% )'}} href={this.props.data.url} download=" " onClick={(e) => {e.stopPropagation();}}><i className="material-icons">play_for_work</i></a>
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
