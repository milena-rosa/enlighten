const Result = require('../models/Result');
const IrradiationController = require('./IrradiationController');
const CostController = require('./CostController');
const LocationController = require('./LocationController');

module.exports = {
  async index(req, res) {
    const result = await Result.findOne().sort('-createdAt');
    return res.json(result);
  },

  async create(req, res) {
    const { averageConsumption, location } = req.body;
    const locationController = new LocationController(location);

    console.log(locationController.values);
    const lat = locationController.values.lat;
    const long = locationController.values.long;
    const state = locationController.values.state;

    if (lat != 0 && long != 0 && state != '') {
      const irradiation = await IrradiationController.getIrradiation(lat, long);
      const dailyIrradiation = irradiation / 365;
      const cost = await CostController.getCost(state);

      // irradiação média diária * área do painel * eficiência do painel * 75% * 30
      const monthlyEnergyPerPanel =
        dailyIrradiation * 1.825 * 0.186 * 0.75 * 30;

      let numberOfPanels = Math.trunc(
        averageConsumption / monthlyEnergyPerPanel
      );

      let initialCosts = numberOfPanels * 900;
      let monthlyEnergySystem = numberOfPanels * monthlyEnergyPerPanel;

      let payback = Math.round(initialCosts / (monthlyEnergySystem * cost));

      const result = await Result.create({
        numberOfPanels,
        payback
      });

      return res.json(result);
    } else {
      return res.json({ message: 'something went wrong' });
    }
  }
};
