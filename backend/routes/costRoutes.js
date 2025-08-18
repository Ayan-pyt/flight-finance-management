// const express = require('express');
// const router = express.Router();
// const {
//     createFuelCost,
//     getFuelCosts,
//     getFuelCostById,
//     updateFuelCost,
//     deleteFuelCost,
// } = require('../controllers/fuelCostController');
// const {
//     createSalary,
//     getSalaries,
//     getSalaryById,
//     updateSalary,
//     deleteSalary,
//     // Add other salary controller functions here if you create them
// } = require('../controllers/salaryController');

// // ADDED: Import the new middleware
// const { protect, admin } = require('../middleware/authMiddleware');

// // Fuel Cost Routes - PROTECTED BY ADMIN MIDDLEWARE
// router.route('/fuelcosts')
//     .post(protect, admin, createFuelCost) // <-- ADDED: protect and admin middleware
//     .get(protect, admin, getFuelCosts);    // <-- ADDED: protect and admin middleware

// router.route('/fuelcosts/:id')
//     .get(protect, admin, getFuelCostById)  // <-- ADDED: protect and admin middleware
//     .put(protect, admin, updateFuelCost)  // <-- ADDED: protect and admin middleware
//     .delete(protect, admin, deleteFuelCost); // <-- ADDED: protect and admin middleware

// // Salary Routes - PROTECTED BY ADMIN MIDDLEWARE
// router.route('/salaries')
//     .post(protect, admin, createSalary)    // <-- ADDED: protect and admin middleware
//     .get(protect, admin, getSalaries);     // <-- ADDED: protect and admin middleware

// router.route('/salaries/:id')
//     .get(protect, admin, getSalaryById)    // <-- ADDED: protect and admin middleware
//     .put(protect, admin, updateSalary)    // <-- ADDED: protect and admin middleware
//     .delete(protect, admin, deleteSalary);  // <-- ADDED: protect and admin middleware

// module.exports = router;



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

