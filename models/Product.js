// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  price: Number,
  startDate: String,
  endDate: String,
  discount: Number,
    stock: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);