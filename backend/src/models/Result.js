const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    numberOfPanels: Number,
    payback: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Result', PostSchema);
