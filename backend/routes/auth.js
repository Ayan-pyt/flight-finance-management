// backend/routes/auth.js

const express = require('express');
const router = express.Router();

// Import the functions from your controller
const { registerUser, loginUser } = require('../controllers/authController');

// --- USER SIGNUP ---
// When a POST request comes to /api/auth/signup, it will run the registerUser function.
// I have removed the duplicate '/register' route to avoid confusion.
router.post('/signup', registerUser);

// --- USER LOGIN ---
// When a POST request comes to /api/auth/login, it will run the loginUser function.
router.post('/login', loginUser);

module.exports = router;