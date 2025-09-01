// File: /controllers/flightController.js

const Flight = require('../models/flight');

// Show all flights OR search for flights based on query parameters
exports.listFlights = async (req, res) => {
  try {
    console.log('--- New Flight Search Request ---');
    console.log('Received query params:', req.query);

    const { from, to, date } = req.query;
    const query = {};

    if (from) {
      query.departure = from;
    }
    if (to) {
      query.arrival = to;
    }
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(date);
      nextDay.setDate(searchDate.getDate() + 1);

      query.departureTime = {
        $gte: searchDate,
        $lt: nextDay
      };
    }

    console.log('Constructed MongoDB query:', JSON.stringify(query, null, 2));
    const flights = await Flight.find(query);
    console.log(`Found ${flights.length} flights.`);
    console.log('---------------------------------');

    res.json({ success: true, count: flights.length, data: flights });

  } catch (err) {
    console.error("Error fetching flights:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single flight details
exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a flight's status
exports.updateFlightStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = ['Scheduled', 'On Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid or missing status' });
        }

        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        flight.status = status;
        const updatedFlight = await flight.save();
        res.json(updatedFlight);

    } catch (error) {
        console.error("Error updating flight status:", error);
        res.status(500).json({ message: error.message });
    }
};