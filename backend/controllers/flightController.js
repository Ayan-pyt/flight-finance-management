// backend/controllers/flightController.js

const Flight = require('../models/flight');

// Show all flights OR search for flights based on query parameters
exports.listFlights = async (req, res) => {
  try {
    // --- DEBUG LOG 1: See what the server receives ---
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
      // The date from the frontend 'YYYY-MM-DD' is interpreted as UTC midnight.
      const searchDate = new Date(date);
      const nextDay = new Date(date);
      nextDay.setDate(searchDate.getDate() + 1);

      query.departureTime = {
        $gte: searchDate,
        $lt: nextDay
      };
    }

    // --- DEBUG LOG 2: See the final query being sent to MongoDB ---
    console.log('Constructed MongoDB query:', JSON.stringify(query, null, 2));

    const flights = await Flight.find(query);

    // --- DEBUG LOG 3: See what was found in the database ---
    console.log(`Found ${flights.length} flights.`);
    console.log('---------------------------------');


    res.json({ success: true, count: flights.length, data: flights });

  } catch (err) {
    console.error("Error fetching flights:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single flight details (no changes)
exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
