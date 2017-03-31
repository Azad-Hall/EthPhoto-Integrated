import React from "react";
import {
  GoogleMapLoader,
  GoogleMap,
  InfoWindow,
  Marker,
} from "react-google-maps";

// import './index.css';
import mapStyle from '../mapStyle.json';

import SearchBox from "react-google-maps";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  zIndex: '100'
};

const SimpleMap = props => (
  <section style={{ height: `100%` }}>
    <GoogleMapLoader
      containerElement={
        <div
          {...props.containerElementProps}
          style={{
            position: 'absolute',
            top: '0px',
            bottom: 0,
            left: 0,
            right: 0
          }}
        />
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => console.log('')}
          defaultZoom={5}
          defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
          onClick={props.onMapClick}
          onShowImage={props.onShowImage}
          popup={props.popup}
          defaultOptions={{ styles: mapStyle, minZoom:2 }}
        >

          {props.markers.map((marker, index) => (
            <Marker
              {...marker}
              onRightclick={() => props.onMarkerRightclick(index)}
              onClick={() => props.onMarkerClick(marker)}
            >
              {marker.showInfo && (
                <InfoWindow onCloseClick={() => this.props.onShowImage}>
                  {
                    marker.imageUrl ? <div id="infowindow"><img src={marker.imageUrl} onClick={() => {}}/></div>:<div></div>
                  }
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      }
    />
  </section>
);

export default SimpleMap;
