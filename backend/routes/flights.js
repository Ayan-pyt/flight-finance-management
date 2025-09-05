// File: backend/routes/flights.js

const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const flightController = require('../controllers/flightController');

// --- USER-FACING ROUTE ---
// @route   GET /api/flights
// @desc    Get all available (non-cancelled) flights for users.
// @access  Public
router.get('/', flightController.listFlights);


// --- ADMIN-ONLY ROUTES ---

// @route   POST /api/flights/admin/create
// @desc    Create a new flight
// @access  Private/Admin
router.post('/admin/create', auth, admin, flightController.createFlight);

// @route   GET /api/flights/admin/all
// @desc    Get ALL flights (including cancelled) for the admin view.
// @access  Private/Admin
router.get('/admin/all', auth, admin, flightController.listAllFlightsForAdmin);

// @route   GET /api/flights/admin/status/:flightNumber
// @desc    Get a single flight by number for the tracker.
// @access  Private/Admin
router.get('/admin/status/:flightNumber', auth, admin, flightController.getFlightByNumber);

// @route   PUT /api/flights/admin/status/:id
// @desc    Update a flight's status
// @access  Private/Admin
// CORRECTED: This route now correctly calls the updateFlightStatus function.
router.put('/admin/status/:id', auth, admin, flightController.updateFlightStatus);


module.exports = router;