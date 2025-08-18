// backend/controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// @desc    Create a new feedback entry
// @route   POST /api/feedback
// @access  Public
const createFeedback = async (req, res) => {
  try {
    const { name, email, flightNumber, rating, feedback } = req.body;

    // Basic validation
    if (!name || !email || !rating || !feedback) {
      return res.status(400).json({ success: false, error: "Please fill in all required fields." });
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      flightNumber,
      rating,
      feedback,
    });

    res.status(201).json({ success: true, data: newFeedback });
  } catch (err) {
    console.error('Feedback creation error:', err);
    res.status(500).json({ success: false, error: 'Server error while submitting feedback.' });
  }
};

// @desc    Get all feedback entries
// @route   GET /api/feedback
// @access  Private/Admin
const getAllFeedback = async (req, res) => {
  try {
    // Sort by newest first
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
};
