const express = require('express');
const { listFlights, getFlight } = require('../controllers/flightController');
const router = express.Router();

router.get('/', listFlights);         // GET /api/flights - List all flights
router.get('/:id', getFlight);        // GET /api/flights/:id - Single flight

module.exports = router;
