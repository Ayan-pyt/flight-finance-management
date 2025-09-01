const express = require('express');
const router = express.Router();
const {
    getMaintenanceCosts,
    createMaintenanceCost,
    updateMaintenanceCost,
    deleteMaintenanceCost
} = require('../controllers/maintenanceCostController');
const { protect, admin } = require('../middleware/authMiddleware');

// Secure all routes. They all require a logged-in admin.
router.route('/')
    .get(protect, admin, getMaintenanceCosts)
    .post(protect, admin, createMaintenanceCost);

router.route('/:id')
    .put(protect, admin, updateMaintenanceCost)
    .delete(protect, admin, deleteMaintenanceCost);

module.exports = router;