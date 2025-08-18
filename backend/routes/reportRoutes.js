// backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller function
const { getFinancialSummary } = require('../controllers/reportController');

// Import our security middleware
const { verifyToken, verifyAdmin } = require('../middleware/adminAuth');

// @desc    Get a summary of all financial data
// @route   GET /api/reports/summary
// @access  Private/Admin
router.route('/summary').get(verifyToken, verifyAdmin, getFinancialSummary);

module.exports = router;