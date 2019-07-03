const Irradiation = require('../models/Irradiation');
const Cost = require('../models/Cost');
const InputUser = require('../models/InputUser');
const LocationController = require('./LocationController');

// const API_KEY = 'AIzaSyA_uWwof6O6vJ4W6vJLrbwNHDLYCxVlC_U';

// const NodeGeocoder = require('node-geocoder');
// const options = {
//   provider: 'google',
//   httpAdapter: 'https',
//   apiKey: API_KEY,
//   formatter: null,
//   region: 'BR'
// };
// const geocoder = NodeGeocoder(options);

module.exports = {
  async store(req, res) {
    const { location, avgConsumption } = req.body;

    const { long, lat } = LocationController.getLatLong(location);
    const { state } = LocationController.getState(location);

    geocoder.geocode(location, async (err, data) => {
      if (err || !data.length) {
        return res.json({ message: 'Invalid address' });
      }

      const long = Math.trunc(data[0].longitude);
      const lat = Math.trunc(data[0].latitude);

      // obtém irradiação média anual com base na longitude, latitude
      const irradiation = (await Irradiation.findOne({ long, lat }))
        .irradiation;

      // obtém tarifa média estadual
      const state = data[0].administrativeLevels.level1short;
      const cost = (await Cost.findOne({ state: state })).cost;

      const inputUser = await InputUser.create({
        averageConsumption: avgConsumption,
        cost,
        irradiation
      });

      // retorna JSON com consumo médio, tarifa e irradiação média anual
      res.json(inputUser);
    });
  },

  async index(req, res) {
    const input = await InputUser.findOne().sort('-createdAt');
    return res.json(input);
  }
};
