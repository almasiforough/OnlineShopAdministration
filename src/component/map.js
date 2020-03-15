import React from 'react'
import ReactMapboxGl, {  ZoomControl, Marker } from 'react-mapbox-gl';
import NavigationControl from "mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as geolib from 'geolib';
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZm9yb3VnaGFsbWFzaSIsImEiOiJjazZxYnN4M3QwaXVvM2pwN3NxeXZtcmUxIn0.BEfCqG2BDmYcNBYgjJZG_Q'
});
let MarkerUrl = "https://i.imgur.com/MK4NUzI.png"
// let PCoordinates;
// let finalCoordinates;
// let finalPcoordinates;
class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PolygonCoordinates: [],
      MapCoordinates: []
    }
    this.drawControl = React.createRef();
    this.onMapLoad = this.onMapLoad.bind(this);
    this.updat = this.updat.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.changeCoordinatesToObject = this.changeCoordinatesToObject.bind(this);
  }
  onMapLoad(map) {
    map.addControl(new NavigationControl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
    this.finalCoordinates = this.props.Coordinates.map(item => {
      var coord = { 'latitude': item[0], longitude: item[1] }
      return coord;
    })

    map.on('draw.create', this.updat);
  }
  updat(e) {
    this.PCoordinates = e.features[0].geometry.coordinates[0];
    this.finalPcoordinates = this.PCoordinates.map(item => {
      var coord = { 'latitude': item[0], longitude: item[1] }
      return coord;
    })
    this.setState(
      {
        PolygonCoordinates: this.finalPcoordinates
      }
    )
  }
  handleButtonClick() {
    var PolygonPoints = this.finalCoordinates.filter(item => {
      if (geolib.isPointInPolygon(item, this.state.PolygonCoordinates) == true) {
        return item
      }
    })
    var FindArray = [];
    PolygonPoints.forEach(element => {
      this.props.Data.find(item => {
        if (item[7][0] == element.latitude && item[7][1] == element.longitude) {
          //  console.log(item[0],item[7]);
          FindArray.push(item[0]);
        }
      })
    });
    this.props.setPolygonId(FindArray);
  }
  changeCoordinatesToObject() {
    this.finalPcoordinates = this.PCoordinates.map(item => {
      var coord = { 'latitude': item[0], longitude: item[1] }
      return coord;
    })
    return this.finalPcoordinates
    this.finalCoordinates = this.props.Coordinates.map(item => {
      var coord = { 'latitude': item[0], longitude: item[1] }
      return coord;
    })
  }
  render() {
    return (
      <div>
        <Map onStyleLoad={this.onMapLoad}
          style="mapbox://styles/mapbox/streets-v9"
          center={[144.9632, -37.8142]}
          containerStyle={{
            height: '70vh',
            width: '99vw'
          }}
        >
          {this.props.Coordinates.map(item => {
            return (
              <Marker coordinates={item}
                anchor="bottom"
                key={item[0]}
              >
                <img src={MarkerUrl} />
              </Marker>
            )
          }
          )}
          <ZoomControl position="bottom-left" />
          <DrawControl controls={{
            point: false,
            line_string: false,
            combine_features: false,
            uncombine_features: false
          }}
            ref={(drawControl) => { this.drawControl = drawControl; }}
          />
        </Map>
        <button className='selectbtn' onClick={this.handleButtonClick}>Add Polygon To Selected Order Table</button>
      </div>

    )
  }
}
export default map;