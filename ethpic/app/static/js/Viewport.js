import React, {Component, PropTypes} from "react";
import {Surface} from "gl-react-dom";
import ImageEffects from "./ImageEffects";

const vdomForContent = ({ uri, mainType, type }, onLoadSize) =>
  mainType === "video" ?
  <video loop autoPlay onLoad={e => onLoadSize(e.target.videoWidth, e.target.videoHeight)}>
    <source type={type} src={uri} />
  </video> :
  uri ?
  <img key={uri} src={uri} crossOrigin onLoad={e => onLoadSize(e.target.width, e.target.height)} /> :
  uri;

const contentForDropEvent = e => {
  const file = e.dataTransfer.files[0];
  if (file) {
    return {
      uri: URL.createObjectURL(file),
      type: file.type,
      mainType: file.type.split("/")[0]
    };
  }
  const text = e.dataTransfer.getData("text");
  if (text && text.match(/http[s]?:\/\//)) {
    return { uri: text };
  }
  return { uri: null };
};

const styles = {
  dropDescr: {
    opacity: 0.3,
    fontStyle: "italic"
  },
  links: {
    paddingTop: 10
  },
  link: {
    color: "#09F",
    fontSize: "0.8em",
    marginRight: 4
  }
};

const width = 400;
const height = 300;

export default class Viewport extends Component {

  constructor (props) {
    super(props);
  }

  onDrop = e => {
    const { onLoadNewContent } = this.props;
    e.preventDefault();
    e.stopPropagation();
    onLoadNewContent(contentForDropEvent(e));
  };

  onDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onLoadSize = (width, height) => {
    const { content, onLoadNewContent } = this.props;
    onLoadNewContent({ ...content, width, height });
  };

  onClickUrl = e => {
    const { onLoadNewContent } = this.props;
    e.preventDefault();
    onLoadNewContent({ uri: e.target.href });
  };

  captureFrame = opts =>
    this.refs.surface.captureFrame(opts);

  render () {
    const {
      onDrop,
      onDragOver,
      onDragEnter,
      onLoadSize,
      onClickUrl,
      props: { content, effects }
    } = this;
    let w = document.documentElement.clientWidth * 0.5, h = document.documentElement.clientHeight * 0.8;
    const ratio = content.width && content.height ? content.height/content.width : 1;
    if (ratio < 1)
      h = w * ratio;
    else
      w = h / ratio;

    return <div style={{ minWidth: width}} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter}>
      <div onClick={() => {document.getElementById("inputImage").click()}} style={{ width:'50vw', margin: "10px", display: 'block', position: 'absolute', top: '45vh', left: '5%', transform: 'translate( 0 , -50% )' }}>
        <Surface ref="surface" width={w} height={h} autoRedraw={content.mainType === "video"} opaque={false}>
          <ImageEffects width={w} height={h} {...effects}>
            {vdomForContent(content, onLoadSize)}
          </ImageEffects>
        </Surface>
      </div>
      <input type='file' style={{display:'none'}} id='inputImage' onChange={this.newImage} />
    </div>;
  }

  getImage = e => {
    var canvas = document.getElementsByTagName("canvas")[0];
    var temp = new Image;
    temp.src = canvas.toDataURL('image/jpg');
  }

  newImage = e => {
    const { onLoadNewContent } = this.props;
    var reader = new FileReader();
     reader.onload = function(event){
        //  console.log(event.target.result);
     }
     e.preventDefault();
     e.stopPropagation();
     const file = e.target.files[0];
     file.crossOrigin = "Anonymous";
     var x = {
         uri: URL.createObjectURL(file),
         type: file.type,
         mainType: file.type.split("/")[0]
     };

     onLoadNewContent(x);

   reader.readAsDataURL(e.target.files[0]);
  }
}

Viewport.propTypes = {
  content: PropTypes.object.isRequired,
  effects: PropTypes.object.isRequired,
  onLoadNewContent: PropTypes.func.isRequired
};
