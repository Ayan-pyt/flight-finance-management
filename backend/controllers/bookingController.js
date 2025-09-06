const Booking = require('../models/Booking');
const Flight = require('../models/flight');
const User = require('../models/user'); // Assuming your user model is named 'user.js'

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (User must be logged in)
exports.createBooking = async (req, res) => {
    try {
        const { flightId, passengers, paymentMethod } = req.body;
        const userId = req.user.id; // We get this from the auth middleware

        if (!flightId || !passengers || !paymentMethod) {
            return res.status(400).json({ message: 'Missing booking details.' });
        }

        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found.' });
        }

        // --- Core Booking Logic ---
        if (flight.seatsAvailable < passengers) {
            return res.status(400).json({ message: 'Not enough seats available on this flight.' });
        }

        // Decrease the number of available seats on the flight
        flight.seatsAvailable -= passengers;
        await flight.save();

        const newBooking = new Booking({
            user: userId,
            flight: flightId,
            passengers,
            // As you requested, the total price is the flight's base price.
            totalPrice: flight.price, 
            paymentMethod,
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: 'Booking confirmed successfully!',
            data: savedBooking
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error while creating booking.' });
    }
};

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        // Find all bookings for this user and populate the 'flight' details
        // Sorting by newest first
        const bookings = await Booking.find({ user: userId })
            .populate('flight')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Server error while fetching bookings.' });
    }
};
