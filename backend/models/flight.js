const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number,
  seatsAvailable: Number
}, { timestamps: true });

module.exports = mongoose.model('flight', FlightSchema);
