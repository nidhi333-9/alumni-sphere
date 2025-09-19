const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Signin route
router.post("/signin", authController.signin);

// Signup route
router.post("/signup", authController.signup);

module.exports = router;
