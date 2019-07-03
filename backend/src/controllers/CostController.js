const Cost = require('../models/Cost');

module.exports = {
  async index(req, res) {
    const costs = await Cost.find();
    return res.json(costs);
  },

  async store(req, res) {
    const { state, cost } = req.body;

    const c = await Cost.create({
      state,
      cost
    });

    return res.json(c);
  }
};
