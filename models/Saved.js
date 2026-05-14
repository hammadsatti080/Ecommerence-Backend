const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    userEmail: String,
    productId: String,
    product: Object,
  },
  { timestamps: true }   // ✅ THIS IS REQUIRED
);

module.exports = mongoose.model("Saved", savedSchema);