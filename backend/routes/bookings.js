const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Import the Booking model

// @route   POST api/bookings
// @desc    Create a new flight booking
// @access  Public
router.post('/', async (req, res) => {
    try {
        // Create a new booking instance using the data from the request body
        const newBooking = new Booking({
            from: req.body.from,
            to: req.body.to,
            date: req.body.date,
            passengers: req.body.passengers,
            passengerName: req.body.passengerName,
            email: req.body.email
        });

        // Save the new booking to the database
        const booking = await newBooking.save();

        // Send a success response back to the client
        res.status(201).json({
            success: true,
            message: 'Booking successful!',
            data: booking
        });

    } catch (err) {
        // If there's an error (e.g., validation error), send an error response
        console.error("Error saving booking:", err.message);
        res.status(400).json({
            success: false,
            message: 'Booking failed. Please check your input.',
            error: err.message
        });
    }
});

module.exports = router;








// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// // @route   POST api/bookings
// // @desc    Create a new flight booking
// // @access  Private (requires authentication)
// router.post('/', authMiddleware, async (req, res) => { // Apply middleware here
//     try {
//         const newBooking = new Booking({
//             // Get user ID from the middleware-decoded token
//             user: req.user.id,
//             from: req.body.from,
//             to: req.body.to,
//             date: req.body.date,
//             passengers: req.body.passengers,
//             passengerName: req.body.passengerName,
//             email: req.body.email
//         });

//         const booking = await newBooking.save();
//         res.status(201).json({
//             success: true,
//             message: 'Booking successful!',
//             data: booking
//         });
//     } catch (err) {
//         console.error("Error saving booking:", err.message);
//         res.status(400).json({
//             success: false,
//             message: 'Booking failed. Please check your input.',
//             error: err.message
//         });
//     }
// });

// module.exports = router;
