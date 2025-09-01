const express = require('express');
const router = express.Router();
const {
    createFuelCost,
    getFuelCosts,
    getFuelCostById,
    updateFuelCost,
    deleteFuelCost,
} = require('../controllers/fuelCostController');
const { protect, admin } = require('../middleware/authMiddleware');

// --- Fuel Cost Routes ---

// GET /api/fuelcosts/ -> Get all fuel costs
// This route is now protected and only accessible by admins.
router.get('/', protect, admin, getFuelCosts);

// POST /api/fuelcosts/ -> Create a new fuel cost
// This route is now protected and only accessible by admins.
router.post('/', protect, admin, createFuelCost);

// GET /api/fuelcosts/:id -> Get a single fuel cost by its ID
// This route is now protected and only accessible by admins.
router.get('/:id', protect, admin, getFuelCostById);

// PUT /api/fuelcosts/:id -> Update a fuel cost
// This route is now protected and only accessible by admins.
router.put('/:id', protect, admin, updateFuelCost);

// DELETE /api/fuelcosts/:id -> Delete a fuel cost
// This route is now protected and only accessible by admins.
router.delete('/:id', protect, admin, deleteFuelCost);

module.exports = router;