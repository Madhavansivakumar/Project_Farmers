const express = require("express");
const router = express.Router();
const { loginUser, registerUser, logoutUser } = require("../controllers/authController.js"); // Import controller functions
const auth = require("../middleware/authMiddleware"); // Middleware to verify token

// Route to register a user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

// Route to log out a user (Protected Route)
router.post("/logout", auth, logoutUser);

module.exports = router;
