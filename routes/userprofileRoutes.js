const express = require("express");
const router = express.Router();

const {
    saveProfile,
    getProfile,
} = require("../controllers/userprofileController");

// SAVE OR UPDATE
router.post("/save", saveProfile);

// GET PROFILE BY EMAIL
router.get("/:email", getProfile);

module.exports = router;