const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {type:Number,
    required: true,
  },
  alcoholPercentage: {type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount:{
    type: String
  },
  type:{
    type: String
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producer",
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
