// File: /routes/auth.js

const express = require('express');
const router = express.Router();

// Import the functions from your controller.
const { registerUser, authUser } = require('../controllers/authController');

// --- USER SIGNUP ---
// When a POST request comes to /api/auth/signup, it will run the registerUser function.
router.post('/signup', registerUser);

// --- USER LOGIN ---
// When a POST request comes to /api/auth/login, it will run the loginUser function.
// CORRECTED: Using the correct 'authUser' function.
router.post('/login', authUser);

module.exports = router;