// backend/routes/costRoutes.js

const express = require('express');
const router = express.Router();

// Import Controllers
const { getFuelCosts } = require('../controllers/fuelCostController');
const { getSalaries } = require('../controllers/salaryController');
const {
    getMaintenanceCosts,
    createMaintenanceCost,
    updateMaintenanceCost,
    deleteMaintenanceCost
} = require('../controllers/maintenanceCostController');
const {
    getOperationalCosts,
    createOperationalCost,
    updateOperationalCost,
    deleteOperationalCost
} = require('../controllers/operationalCostController'); // <-- Import new controller

// Import Middleware
const { verifyToken, verifyAdmin } = require('../middleware/adminAuth');

// --- Fuel Cost Routes ---
router.route('/fuelcosts').get(verifyToken, verifyAdmin, getFuelCosts);

// --- Salary Routes ---
router.route('/salaries').get(verifyToken, verifyAdmin, getSalaries);

// --- Maintenance Cost Routes ---
router.route('/maintenancecosts')
    .get(verifyToken, verifyAdmin, getMaintenanceCosts)
    .post(verifyToken, verifyAdmin, createMaintenanceCost);

router.route('/maintenancecosts/:id')
    .put(verifyToken, verifyAdmin, updateMaintenanceCost)
    .delete(verifyToken, verifyAdmin, deleteMaintenanceCost);

// --- Operational Cost Routes ---
router.route('/operationalcosts')
    .get(verifyToken, verifyAdmin, getOperationalCosts)
    .post(verifyToken, verifyAdmin, createOperationalCost);

router.route('/operationalcosts/:id')
    .put(verifyToken, verifyAdmin, updateOperationalCost)
    .delete(verifyToken, verifyAdmin, deleteOperationalCost);


module.exports = router;

