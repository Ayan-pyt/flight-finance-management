// File: backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router();
// CORRECTED: Import both controller functions
const { getExpenseSummary, getFinancialSummary } = require('../controllers/reportController');
const { auth, admin } = require('../middleware/auth'); 

// --- START OF NEW ROUTE ---
// @route   GET /api/reports/summary
// @desc    Get a summary of all financial data for the dashboard widgets
// @access  Private/Admin
router.get('/summary', auth, admin, getFinancialSummary);
// --- END OF NEW ROUTE ---


// @route   GET /api/reports/expense-summary
// @desc    Get a summary of all expenses for the pie chart
// @access  Private/Admin
router.get('/expense-summary', auth, admin, getExpenseSummary);

module.exports = router;