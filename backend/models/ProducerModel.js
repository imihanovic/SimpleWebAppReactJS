const mongoose = require("mongoose");

const ProducerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Producer = mongoose.model("Producer", ProducerSchema);
module.exports = Producer;
