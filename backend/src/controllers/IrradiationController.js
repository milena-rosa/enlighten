const Irradiation = require('../models/Irradiation');

module.exports = {
  async index(req, res) {
    const irradiations = await Irradiation.find();
    return res.json(irradiations);
  },

  async store(req, res) {
    const { long, lat, irradiation } = req.body;

    const irradiacao = await Irradiation.create({
      long,
      lat,
      irradiation
    });

    return res.json(irradiacao);
  }
};
