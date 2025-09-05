// // File: /models/flight.js

// const mongoose = require('mongoose');

// const FlightSchema = new mongoose.Schema({
//   flightNumber: String,
//   departure: String,
//   arrival: String,
//   departureTime: Date,
//   arrivalTime: Date,
//   price: Number,
//   seatsAvailable: Number,
//   status: {
//     type: String,
//     enum: ['Scheduled', 'On-Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'],
//     default: 'Scheduled'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('flight', FlightSchema);




// File: /models/flight.js





// File: /models/flight.js

const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  // CORRECTED: Explicitly made 'price' a required field with a minimum value.
  price: { 
    type: Number, 
    required: [true, 'Path `price` is required.'], 
    min: 0 
  },
  seatsAvailable: { type: Number, default: 180 },
  status: {
    type: String,
    enum: ['Scheduled', 'On-Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'],
    default: 'Scheduled'
  }
}, { timestamps: true });

module.exports = mongoose.model('Flight', FlightSchema);