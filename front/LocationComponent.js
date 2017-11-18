import React from 'react';
import {geolocated} from 'react-geolocated';

class LocationComponent extends React.Component {

  render() {
    if(this.props.isGeolocationAvailable&& this.props.isGeolocationEnabled&& this.props.coords)
      this.props.updateForm(this.props.coords.latitude, this.props.coords.longitude);
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? ''
          : <div>Getting the location data&hellip; </div>;
  }
  
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(LocationComponent);
