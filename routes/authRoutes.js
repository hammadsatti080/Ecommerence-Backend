const express = require("express");
const router = express.Router();

const {
  signup,
  login,


} = require("../controllers/authController");
const authController = require("../controllers/authController"); // <-- THIS LINE

router.post("/signup", signup);
router.post("/login", login);

router.post("/reset-password", authController.resetPassword);

// NEW: Check if email exists
router.post("/check-email", authController.checkEmail);

module.exports = router;