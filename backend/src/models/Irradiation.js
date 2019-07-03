const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    long: Number,
    lat: Number,
    irradiation: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Irradiation', PostSchema);
