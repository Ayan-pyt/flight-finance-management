// module.exports = mongoose.model('Booking', BookingSchema);

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This links the booking to a specific user
        required: true,
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight', // This links the booking to a specific flight
        required: true,
    },
    passengers: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Mobile Banking', 'PayPal', 'Cash'],
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Confirmed',
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Booking', BookingSchema);
