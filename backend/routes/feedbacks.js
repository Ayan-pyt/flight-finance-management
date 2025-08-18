// backend/routes/feedbacks.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createFeedback,
  getAllFeedback,
} = require('../controllers/feedbackController');

// Import security middleware
const { verifyToken, verifyAdmin } = require('../middleware/adminAuth');

// @route   POST /api/feedback
// @desc    Allow any user to submit feedback
// @access  Public
router.route('/').post(createFeedback);

// @route   GET /api/feedback
// @desc    Allow only admins to view all feedback
// @access  Private/Admin
router.route('/').get(verifyToken, verifyAdmin, getAllFeedback);

module.exports = router;