// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking'); // Import the Booking model

// // @route   POST api/bookings
// // @desc    Create a new flight booking
// // @access  Public
// router.post('/', async (req, res) => {
//     try {
//         // Create a new booking instance using the data from the request body
//         const newBooking = new Booking({
//             from: req.body.from,
//             to: req.body.to,
//             date: req.body.date,
//             passengers: req.body.passengers,
//             passengerName: req.body.passengerName,
//             email: req.body.email
//         });

//         // Save the new booking to the database
//         const booking = await newBooking.save();

//         // Send a success response back to the client
//         res.status(201).json({
//             success: true,
//             message: 'Booking successful!',
//             data: booking
//         });

//     } catch (err) {
//         // If there's an error (e.g., validation error), send an error response
//         console.error("Error saving booking:", err.message);
//         res.status(400).json({
//             success: false,
//             message: 'Booking failed. Please check your input.',
//             error: err.message
//         });
//     }
// });

// module.exports = router;








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

// javascript
// // Add this line in backend/server.js
// app.use('/api/bookings', require('./routes/bookings'));
