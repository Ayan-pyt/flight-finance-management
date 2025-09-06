// File: /controllers/bookingController.js

const Booking = require('../models/Booking');
const Flight = require('../models/flight');
const User = require('../models/user');

exports.createBooking = async (req, res) => {
    try {
        const { flightId, passengers, paymentMethod } = req.body;
        const userId = req.user.id; 

        if (!flightId || !passengers || !paymentMethod) {
            return res.status(400).json({ message: 'Missing booking details.' });
        }

        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found.' });
        }

        if (flight.seatsAvailable < passengers) {
            return res.status(400).json({ message: 'Not enough seats available on this flight.' });
        }

        flight.seatsAvailable -= passengers;
        await flight.save();

        // --- START OF FIX ---
        // CORRECTED: The totalPrice is now correctly calculated based on the base price and number of passengers.
        const calculatedTotalPrice = flight.price * passengers;
        // --- END OF FIX ---

        const newBooking = new Booking({
            user: userId,
            flight: flightId,
            passengers,
            totalPrice: calculatedTotalPrice, // Use the new calculated price
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

// This function is already correct and does not need changes.
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
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
