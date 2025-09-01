// File: /models/flight.js

const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number,
  seatsAvailable: Number,
  status: {
    type: String,
    enum: ['Scheduled', 'On Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'],
    default: 'Scheduled'
  }
}, { timestamps: true });

module.exports = mongoose.model('flight', FlightSchema);