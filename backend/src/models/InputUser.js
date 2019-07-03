const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    irradiation: Number,
    averageConsumption: Number,
    cost: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('InputUser', PostSchema);
