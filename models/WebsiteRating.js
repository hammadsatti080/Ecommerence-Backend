const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    userWebsiteRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    userReviewMessage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "ratingCreatedAt",
      updatedAt: "ratingUpdatedAt",
    },
  }
);

module.exports = mongoose.model("WebsiteRating", ratingSchema);