// File: backend/routes/flights.js

const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const flightController = require('../controllers/flightController');

// --- USER-FACING ROUTE ---
router.get('/', flightController.listFlights);


// --- ADMIN-ONLY ROUTES ---
router.post('/admin/create', auth, admin, flightController.createFlight);
router.get('/admin/all', auth, admin, flightController.listAllFlightsForAdmin);
router.get('/admin/status/:flightNumber', auth, admin, flightController.getFlightByNumber);
router.put('/admin/status/:id', auth, admin, flightController.updateFlightStatus);

// --- START OF NEW FEATURE ---
// NEW ROUTE: Handles the permanent deletion of a flight.
router.delete('/admin/:id', auth, admin, flightController.deleteFlight);
// --- END OF NEW FEATURE ---


module.exports = router;