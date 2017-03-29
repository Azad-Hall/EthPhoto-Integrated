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

const server_side = "http://139.59.72.137:8080/ipfs/";

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

const fields = [
  { id: "blur", name: "Blur", min: 0, max: 6, step: 0.1, prettyPrint: blur => blur.toFixed(1) },
  { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "brightness", name: "Brightness", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "saturation", name: "Saturation", min: 0, max: 10, step: 0.1, prettyPrint: percentagePrint },
  { id: "hue", name: "HueRotate", min: 0, max: 2 * Math.PI, step: 0.1, prettyPrint: radiantPrint },
  { id: "negative", name: "Negative", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "flyeye", name: "FlyEye", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint }
];

export default class Uploader extends Component {
  state = {
      markers: []
    };

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
      uploaded: null,
      ...initialInputs
    };
  }

  componentDidMount() {
    this.setState({markers: this.props.markerData});
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
    var lat=parseInt(this.refs.lat.value.trim());
    var lng=parseInt(this.refs.lng.value.trim());
    var img=this.refs.image.value;
    var type=this.refs.imgType.value;

    var input_file = $("#image_input")

    if(!lat || !lng || !img || !type){
      alert("Please enter all the info");
      return;
    }
    console.clear();
    console.log(img);
    console.log(this.refs.image);
    console.log(lat + "  " + lng);             //here is your latitude longitude and user data
    console.log(this.props.user);
    console.log(type);
    this.refs.lat.value = "";
    this.refs.lng.value = "";

    var types = {"Landscape": 1, "People": 2, "Architecture": 3};
    console.log(types[type]);
    var that = this;

    EmbarkJS.Storage.setProvider('ipfs',{server: '139.59.72.137', port: '5001'});
    EmbarkJS.Storage.uploadFile(input_file).then(function(input_file_hash) {
      console.log("topic_value", types[type]);
      console.log("input_file_hash", input_file_hash);
      ethDB.postPhoto(input_file_hash, lng, lat, types[type], {gas: '0x100590'}, {gasPrice: '0x100590'}).then(function(result){
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
                lng: lng,
                lat: lat
              },
              defaultAnimation: 2,
              showInfo: false,
              imageUrl: server_side + input_file_hash,
              content: true,
              title:'Image Title',
              tags:[type],
              key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
          ],
        });
        that.setState({ markers });
        that.props.updateMarkers(that.state.markers);
        that.setState({markers: that.props.markerData});
        console.log(markers);
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
        <Viewport
          ref="viewport"
          effects={effects}
          onLoadNewContent={this.onLoadNewContent}
          content={content}
        />
        <form style={{position:'absolute', right: '5vw', top: '50vh', transform:'translate(0 , -50%)', zIndex:'100', display:'block', width:'30vw'}} onSubmit={this.submitImage.bind(this)}>
          <div className="input-field"><input type="file" id='image_input' className="input" ref="image" onChange={this.imageChange} placeholder="select Image"></input><br/><br/></div>
          <label for="lat" style={{color:'black'}}>Latitude</label>
          <div className="input-field"><input type='number' step="0.00001" className="input" ref="lat" onChange={this.latChange} defaultValue={this.props.curLat ? this.props.curLat : 0} placeholder='Lat'></input></div>
          <label for="lng" style={{color:'black'}}>Longitude</label>
          <div className="input-field"><input type='number' step="0.00001" className="input" ref="lng" onChange={this.lngChange} defaultValue={this.props.curLng ? this.props.curLng : 0} placeholder='Lng'></input></div>
          <div className="input-field">
            <select ref="imgType" style={{display:'block'}}>
              <option value="" disabled selected>Choose your option</option>
              <option value="Landscape">Landscape</option>
              <option value="People">People</option>
              <option value="Architecture">Architecture</option>
            </select>
          </div>
          <button type="submit">Upload</button>
        </form>

      </AppContainer>
    );
  }
}
