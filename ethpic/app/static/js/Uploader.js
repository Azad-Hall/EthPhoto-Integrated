import React from "react";
const {Component} = React;
import Field from "./Field";
import Viewport from "./Viewport";
import AppContainer from "./AppContainer";
import EffectsPanel from "./EffectsPanel";
import Button from "./Button";
import ExportPanel from "./ExportPanel";
import ExportedLink from "./ExportedLink";
import uploadImage from "./uploadImage";
import $ from "./jquery";
import update from "react-addons-update";
import Dropzone from 'react-dropzone';

// const server_side = "http://139.59.72.137:8080/ipfs/";

const percentagePrint = v => (v * 100).toFixed(0) + "%";
const radiantPrint = r => (180 * r / Math.PI).toFixed(0) + "°";

const initialInputs = {
  blur: 0,
  saturation: 1,
  contrast: 1,
  brightness: 1,
  negative: 0,
  hue: 0,
  sepia: 0,
  flyeye: 0
};

// const fields = [
//   { id: "blur", name: "Blur", min: 0, max: 6, step: 0.1, prettyPrint: blur => blur.toFixed(1) },
//   { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
//   { id: "brightness", name: "Brightness", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
//   { id: "saturation", name: "Saturation", min: 0, max: 10, step: 0.1, prettyPrint: percentagePrint },
//   { id: "hue", name: "HueRotate", min: 0, max: 2 * Math.PI, step: 0.1, prettyPrint: radiantPrint },
//   { id: "negative", name: "Negative", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
//   { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
//   { id: "flyeye", name: "FlyEye", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint }
// ];

var image;

export default class Uploader extends Component {
  state = {
      markers: []
    };

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      console.log(acceptedFiles[0].preview);
      var img = document.getElementById('preview');
      img.src = acceptedFiles[0].preview;
      img.style.display="block";
      image = acceptedFiles;
      console.log(image);
  }


  constructor (props) {
    super(props);
    this.state = {
      content: {
        uri: "http://i.imgur.com/wxqlQkh.jpg",
        type: "image/jpg",
        mainType: "image",
        width: 512,
        height: 340
      },
      image:'',
      uploaded: null,
      ...initialInputs
    };
  }

  requestLocation(){
    window.initialize();
  }

  componentDidMount() {
    this.setState({markers: this.props.markerData});

     $("#searchTextField").on('keydown', function (e) {
       if (e.keyCode == 13) {
           e.preventDefault();
       }
     });

    setInterval(function(){
      if(window.place && document.getElementById('lat') && document.getElementById('lng')){
        document.getElementById('lat').value = parseFloat(Math.round(window.place.geometry.location.lat() * 10000) / 10000).toFixed(4);
        document.getElementById('lng').value = parseFloat(Math.round(window.place.geometry.location.lng() * 10000) / 10000).toFixed(4);
        window.place = null;
      }
    }, 200);
  }

  onLoadNewContent = content => {
    this.setState({ content });
  };

  onExport = () =>
    this.refs.viewport.captureFrame()
    .then(uploadImage)
    .then(({ data: { link: uploaded } }) => this.setState({ uploaded }));

  submitImage(e){
    e.preventDefault();
    var lat=parseInt(this.refs.lat.value.trim() * 10000);
    var lng=parseInt(this.refs.lng.value.trim() * 10000);
    var img=image;
    var type=this.refs.imgType.value;

    var input_file = [{files: image}];

    if(!lat || !lng || !img || !type){
      alert("Please enter all the info");
      return;
    }
    console.clear();
    console.log(img);
    console.log(lat + "  " + lng);             //here is your latitude longitude and user data
    console.log(this.props.user);
    console.log(type);
    this.refs.lat.value = "";
    this.refs.lng.value = "";

    var types = {"Landscape": 1, "People": 2, "Architecture": 3};
    var types = {
      "Art/Achitecture": 1,
      "People": 2,
      "Technology": 3,
      "Travel": 4,
      "Nature": 5,
      "Abstract": 6,
      "Object": 7,
      "Other:":8
    };

    console.log(types[type]);
    var that = this;
    console.log(input_file);

    // EmbarkJS.Storage.setProvider('ipfs',{server: '139.59.72.137', port: '5001'});
    EmbarkJS.Storage.uploadFile(input_file).then(function(input_file_hash) {
      console.log("topic_value", types[type]);
      console.log("input_file_hash", input_file_hash);

      that.props.functionCall('0x'+that.props.addresses[0],'postPhoto',[ input_file_hash,lng,lat,types[type]],function(err, result){
        console.log("UPLOADED RESULT", result);

        var obj = {};
        obj.lng = () => {return lng};
        obj.lat = () => {return lat};

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
                lng: lng/10000,
                lat: lat/10000
              },
              defaultAnimation: 2,
              showInfo: false,
              imageUrl: that.props.ipfs + '/ipfs/' + input_file_hash,
              content: true,
              title:'',
              userid: 0,
              imageid: 0,
              tags:[type],
              key: Date.now(),
              upvotes:'0' // Add a key property for: http://fb.me/react-warning-keys
            },
          ],
        });
        that.setState({ markers });
        that.props.updateMarkers(that.state.markers);
        that.setState({markers: that.props.markerData});
        console.log(markers);
        that.props.showUserPics();
        that.props.updateValues();
        that.props.toggleShowUpload();
      });
    });

  }

  latChange(){
    console.log('latitude Changing')
  }

  render () {
    const { content, uploaded, ...effects } = this.state;

    return (
      <AppContainer>
        <div style={{position: 'absolute', top:'35%', left: '50%', transform:'translate( -50% , -50% )', zIndex:'100'}} id='drop-box'>
          <Dropzone onDrop={this.onDrop}>
          <div style={{padding: '20px',color:'#D8D6D5'}}>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
        </div>
        <img src="" id='preview' style={{position: 'absolute', top:'30%', left: '50%', transform:'translate( -50% , -50% )', height: '50vh', display:'none', zIndex:'101'}}/>
        <form style={{position:'absolute', left: '50vw', top: '70vh', transform:'translate( -50% , -50% )', zIndex:'100', display:'block', width:'60vw'}} onSubmit={this.submitImage.bind(this)}>

        <label style={{fontFamily:'Roboto', color:'#D8D6D5',display:'inline-block', width:'15%' , fontSize:'1.1rem'}}>Search:</label>
        <input id="searchTextField" type="text" onFocus={this.requestLocation} onBlur={this.getLocation} style={{width:'85%',display:'inline-block',color:'white'}}/>

          <div style={{width:'30vw', display:'inline-block'}}>
          <label style={{fontFamily:'Roboto', color:'#D8D6D5',display:'inline-block' , fontSize:'1.1rem'}}>Latitude</label>
            <div className="input-field">
              <input disabled type='number' className="input" id='lat' step=".0001" ref="lat" defaultValue={this.props.curLat ? this.props.curLat : 0} placeholder='Lat'></input>
            </div>
          </div>

          <div style={{width:'30vw', display:'inline-block'}}>
          <label style={{fontFamily:'Roboto', color:'#D8D6D5',display:'inline-block' , fontSize:'1.1rem'}}>Longitude</label>
            <div className="input-field">
              <input disabled type='number' className="input" id='lng' step=".0001" ref="lng" defaultValue={this.props.curLng ? this.props.curLng : 0} placeholder='Lng'></input>
            </div>
          </div>

          <div className="input-field" style={{width:'25vw', left:'25%', transform:'translate( -50% , 0 )'}}>
            <select ref="imgType" style={{display:'block'}}>
              <option value="" disabled selected>Choose your option</option>

              <option value="Art/Achitecture">Art/Achitecture</option>
              <option value="People">People</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Nature">Nature</option>
              <option value="Abstract">Abstract</option>
              <option value="Object">Object</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" style={{width:'25vw', display:'inline-block', right:0, transform:'translate(-80% , 0)'}}>Upload</button>
        </form>

      </AppContainer>
    );
  }
}
