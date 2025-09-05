// const express = require('express');
// const router = express.Router();
// const Flight = require('../models/flight.js');
// const { auth, admin } = require('../middleware/auth');
// const flightController = require('../controllers/flightController'); // I have added this line

// // ✅ THIS ROUTE IS NOW UPDATED TO HANDLE SEARCH QUERIES
// // @route   GET /api/flights
// // @desc    Get all flights or search for specific flights
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     // Create a query object to filter results
//     const query = {};

//     // Check if 'from' and 'to' are provided in the URL query string
//     if (req.query.from && req.query.to) {
//       // Use case-insensitive regular expressions for a better search experience
//       query.origin = new RegExp(req.query.from, 'i');
//       query.destination = new RegExp(req.query.to, 'i');
//     }

//     // Pass the query object to the find method.
//     // If no search criteria, the object is empty and returns all flights.
//     const flights = await Flight.find(query);
//     res.json(flights);
//   } catch (error) {
//     console.error('Error fetching flights:', error.message);
//     res.status(500).send('Server Error');
//   }
// });

// // --- Other routes remain unchanged ---

// // @route   POST /api/flights
// // @desc    Create a new flight
// // @access  Private/Admin
// // I have updated this route to connect to your controller
// router.post('/', auth, admin, flightController.createFlight);

// // @route   GET /api/flights/status/:flightNumber
// // @desc    Get flight by flight number for tracker
// // @access  Public or Private
// router.get('/status/:flightNumber', async (req, res) => {
//   // ... existing code
// });

// // @route   PUT /api/flights/status/:id
// // @desc    Update a flight's status
// // @access  Private/Admin
// router.put('/status/:id', auth, admin, async (req, res) => {
//     // ... existing code
// });


// module.exports = router;




// File: backend/routes/flights.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/flight.js');
const { auth, admin } = require('../middleware/auth');
const flightController = require('../controllers/flightController');

// @route   GET /api/flights
// @desc    Get all flights or search for specific flights
// @access  Public
router.get('/', flightController.listFlights);

// @route   POST /api/flights
// @desc    Create a new flight
// @access  Private/Admin
router.post('/', auth, admin, flightController.createFlight);

// --- START OF FIX ---

// @route   GET /api/flights/status/:flightNumber
// @desc    Get flight by flight number for tracker
// @access  Private/Admin (for security, only admins can track)
// CORRECTED: This route now calls the new controller function.
router.get('/status/:flightNumber', auth, admin, flightController.getFlightByNumber);

// --- END OF FIX ---


// @route   PUT /api/flights/status/:id
// @desc    Update a flight's status
// @access  Private/Admin
// CORRECTED: This route now correctly calls the updateFlightStatus function from the controller
router.put('/status/:id', auth, admin, flightController.updateFlightStatus);


module.exports = router;