const express = require('express');
const router = express.Router();
const {
    getOperationalCosts,
    createOperationalCost,
    updateOperationalCost,
    deleteOperationalCost
} = require('../controllers/operationalCostController');
const { protect, admin } = require('../middleware/authMiddleware');

// Secure all routes. They all require a logged-in admin.
router.route('/')
    .get(protect, admin, getOperationalCosts)
    .post(protect, admin, createOperationalCost);

router.route('/:id')
    .put(protect, admin, updateOperationalCost)
    .delete(protect, admin, deleteOperationalCost);

module.exports = router;