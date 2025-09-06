// const mongoose = require('mongoose');

// // A Schema defines the structure of a document in a MongoDB collection.
// const BookingSchema = new mongoose.Schema({
//     from: {
//         type: String,
//         required: true
//     },
//     to: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     passengers: {
//         type: Number,
//         required: true,
//         min: 1
//     },
//     passengerName: {
//         type: String,
//         required: [true, "Passenger name is required"],
//         trim: true
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         trim: true,
//         lowercase: true
//     },
//     bookingDate: {
//         type: Date,
//         default: Date.now // Automatically sets the booking timestamp
//     }
// });

// // A Model is a wrapper on the Schema that provides an interface to the database
// // for creating, querying, updating, deleting records, etc.
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
