const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    state: String,
    distributor: String,
    cost: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Cost', PostSchema);
