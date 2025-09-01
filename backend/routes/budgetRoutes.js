const express = require('express');
const router = express.Router();
const { setBudget, getBudget } = require('../controllers/budgetController');
// CORRECTED: Changed 'admin' to 'isAdmin' to match your middleware file
const { protect, admin } = require('../middleware/authMiddleware'); 
router.post('/', protect, admin, setBudget);
router.get('/:year', protect, admin, getBudget);

module.exports = router;