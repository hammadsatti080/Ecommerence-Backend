const express = require("express");

const router = express.Router();

const {
  addRating,
} = require("../controllers/ratingController");

router.post("/add", addRating);

module.exports = router;