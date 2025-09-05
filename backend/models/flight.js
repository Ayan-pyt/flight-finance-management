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

const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    trim: true,
  },
  // FIXED: Changed 'departure' and 'arrival' to 'origin' and 'destination' for clarity.
  origin: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    default: 180 // Example default value
  },
  status: {
    type: String,
    enum: ['Scheduled', 'On-Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'],
    default: 'Scheduled'
  }
}, { timestamps: true });

// FIXED: Changed model name to 'Flight' (singular, capitalized) which is a Mongoose convention.
module.exports = mongoose.model('Flight', FlightSchema);