const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { auth } = require('../middleware/auth'); // Assuming your auth middleware is here

// @route   POST /api/bookings
// @desc    Create a new flight booking
// @access  Private (requires user to be logged in)
router.post('/', auth, createBooking);

// @route   GET /api/bookings/my-bookings
// @desc    Get all bookings for the currently logged-in user
// @access  Private
router.get('/my-bookings', auth, getUserBookings);

module.exports = router;

