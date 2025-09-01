// File: /routes/flights.js

const express = require('express');
const { listFlights, getFlight, updateFlightStatus } = require('../controllers/flightController');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', listFlights);
router.get('/:id', getFlight);

router.patch('/:id/status', protect, admin, updateFlightStatus);

module.exports = router;