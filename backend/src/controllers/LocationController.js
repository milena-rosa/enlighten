const API_KEY = 'AIzaSyA_uWwof6O6vJ4W6vJLrbwNHDLYCxVlC_U';

const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: API_KEY,
  formatter: null,
  region: 'BR'
};
const geocoder = NodeGeocoder(options);

var values = {
  lat: 0,
  long: 0,
  state: ''
};

module.exports = class LocationController {
  constructor(location) {
    this.location = location;

    this.getValues(this.location);

    this.values = values;
  }

  getValues(location) {
    geocoder.geocode(location, (err, data) => {
      if (err || !data.length) {
        return { message: err.message };
      }
      values.lat = Math.trunc(data[0].latitude);
      values.long = Math.trunc(data[0].longitude);
      values.state = data[0].administrativeLevels.level1short;
    });
  }
};
