// File: backend/routes/feedbacks.js

const express = require('express');
const router = express.Router();

const { createFeedback, getAllFeedback, getTopFeedback } = require('../controllers/feedbackController');
const { auth, admin } = require('../middleware/auth'); // Correct middleware import

// @route   POST /api/feedback
// @desc    Allow any user to submit feedback
router.post('/', createFeedback);

// @route   GET /api/feedback/top
// @desc    Get top 3 feedbacks for the landing page
// @access  Public
router.get('/top', getTopFeedback); // NEW ROUTE

// @route   GET /api/feedback
// @desc    Allow only admins to view all feedback
// @access  Private/Admin
router.get('/', auth, admin, getAllFeedback);

module.exports = router;