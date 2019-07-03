const Result = require('../models/Result');
const Irradiation = require('../models/Irradiation');
const Cost = require('../models/Cost');

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

module.exports = {
  async index(req, res) {
    const result = await Result.findOne().sort('-createdAt');
    return res.json(result);
  },

  async create(req, res) {
    const { averageConsumption, location } = req.body;
    var long, lat, state;

    geocoder.geocode(location, async (err, data) => {
      if (err || !data.length) {
        return { message: err.message };
      }
      lat = Math.trunc(data[0].latitude);
      long = Math.trunc(data[0].longitude);
      state = data[0].administrativeLevels.level1short;

      console.log(`lat: ${lat}, long: ${long}, state: ${state}`);
      const irradiation = (await Irradiation.findOne({ long, lat }))
        .irradiation;
      const dailyIrradiation = irradiation / 365;

      const cost = (await Cost.findOne({ state })).cost;

      // irradiação média diária * área do painel * eficiência do painel * 75% * 30
      const monthlyEnergyPerPanel =
        dailyIrradiation * 1.825 * 0.186 * 0.75 * 30;

      let numberOfPanels = Math.trunc(
        averageConsumption / monthlyEnergyPerPanel
      );

      let initialCosts = numberOfPanels * 900;
      let monthlyEnergySystem = numberOfPanels * monthlyEnergyPerPanel;

      let payback = Math.round(initialCosts / (monthlyEnergySystem * cost));
      
      console.log(`nPanels: ${numberOfPanels}, payback: ${payback}`);
      const result = await Result.create({
        numberOfPanels,
        payback
      });

      return res.json(result);
    });
  }
};
