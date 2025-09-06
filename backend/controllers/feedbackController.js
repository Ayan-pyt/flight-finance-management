// File: backend/controllers/feedbackController.js

const Feedback = require('../models/Feedback');

// This function creates a new feedback entry (no changes here)
exports.createFeedback = async (req, res) => {
    try {
        const { name, email, flightNumber, rating, feedback } = req.body;
        if (!name || !email || !rating || !feedback) {
            return res.status(400).json({ success: false, error: "Please fill in all required fields." });
        }
        const newFeedback = await Feedback.create({ name, email, flightNumber, rating, feedback });
        res.status(201).json({ success: true, data: newFeedback });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error while submitting feedback.' });
    }
};

// This function gets all feedback for the admin (no changes here)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// --- START OF NEW FEATURE ---
// @desc    Get the top 3 highest-rated feedback entries
// @route   GET /api/feedback/top
// @access  Public
exports.getTopFeedback = async (req, res) => {
    try {
        // Find feedback, sort by rating in descending order, limit to 3 results
        const topFeedbacks = await Feedback.find({})
            .sort({ rating: -1 })
            .limit(3);
            
        res.status(200).json({ success: true, data: topFeedbacks });
    } catch (err) {
        console.error('Error fetching top feedback:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
// --- END OF NEW FEATURE ---