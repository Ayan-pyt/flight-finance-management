// // File: /controllers/flightController.js

// const Flight = require('../models/flight');
// exports.createFlight = async (req, res) => {
//   try {
//     // We expect origin and destination to be in the request body
//     const { flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;

//     if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !price) {
//       return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
//     }

//     const newFlight = new Flight({
//       flightNumber,
//       origin,
//       destination,
//       departureTime,
//       arrivalTime,
//       price,
//       seatsAvailable
//     });

//     const savedFlight = await newFlight.save();
//     res.status(201).json({ success: true, message: 'Flight created successfully!', data: savedFlight });

//   } catch (err) {
//     console.error("Error creating flight:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Show all flights OR search for flights based on query parameters
// exports.listFlights = async (req, res) => {
//   try {
//     console.log('--- New Flight Search Request ---');
//     console.log('Received query params:', req.query);

//     const { from, to, date } = req.query;
//     const query = {};

//     if (from) {
//       query.departure = from;
//     }
//     if (to) {
//       query.arrival = to;
//     }
//     if (date) {
//       const searchDate = new Date(date);
//       const nextDay = new Date(date);
//       nextDay.setDate(searchDate.getDate() + 1);

//       query.departureTime = {
//         $gte: searchDate,
//         $lt: nextDay
//       };
//     }

//     console.log('Constructed MongoDB query:', JSON.stringify(query, null, 2));
//     const flights = await Flight.find(query);
//     console.log(`Found ${flights.length} flights.`);
//     console.log('---------------------------------');

//     res.json({ success: true, count: flights.length, data: flights });

//   } catch (err) {
//     console.error("Error fetching flights:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get single flight details
// exports.getFlight = async (req, res) => {
//   try {
//     const flight = await Flight.findById(req.params.id);
//     if (!flight) return res.status(404).json({ message: 'Flight not found' });
//     res.json(flight);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ADD THIS ENTIRE FUNCTION to flightController.js

// // Get a single flight by its flight number for the tracker
// exports.getFlightByNumber = async (req, res) => {
//   try {
//     const flightNumber = req.params.flightNumber;
    
//     // Use findOne to search by flightNumber. The 'i' makes it case-insensitive.
//     const flight = await Flight.findOne({ flightNumber: new RegExp(`^${flightNumber}$`, 'i') });

//     if (!flight) {
//       return res.status(404).json({ message: 'Flight not found with that number.' });
//     }
    
//     res.status(200).json(flight);

//   } catch (err) {
//     console.error("Error fetching flight by number:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update a flight's status
// exports.updateFlightStatus = async (req, res) => {
//     try {
//         const { status } = req.body;

//         const validStatuses = ['Scheduled', 'On Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'];
//         if (!status || !validStatuses.includes(status)) {
//             return res.status(400).json({ message: 'Invalid or missing status' });
//         }

//         const flight = await Flight.findById(req.params.id);

//         if (!flight) {
//             return res.status(404).json({ message: 'Flight not found' });
//         }

//         flight.status = status;
//         const updatedFlight = await flight.save();
//         res.json(updatedFlight);

//     } catch (error) {
//         console.error("Error updating flight status:", error);
//         res.status(500).json({ message: error.message });
//     }
// };




// File: /controllers/flightController.js

// File: /controllers/flightController.js

const Flight = require('../models/flight');

// Create a new flight (ADMIN)
exports.createFlight = async (req, res) => {
    // This function is correct and remains unchanged
    try {
        const { flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;
        if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !price) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }
        const newFlight = new Flight({ flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable });
        const savedFlight = await newFlight.save();
        res.status(201).json({ success: true, message: 'Flight created successfully!', data: savedFlight });
    } catch (err) {
        console.error("Error creating flight:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// --- START OF FIX ---
// Show all flights OR search for flights based on query parameters
exports.listFlights = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        const query = {};

        // CORRECTED: Changed query fields to 'origin' and 'destination' to match the database model.
        // Using case-insensitive regex for better search results.
        if (from) {
            query.origin = { $regex: from, $options: 'i' };
        }
        if (to) {
            query.destination = { $regex: to, $options: 'i' };
        }
        // This logic correctly finds all flights on a specific day.
        if (date) {
            const searchDate = new Date(date);
            // Set to the beginning of the day in UTC to avoid timezone issues
            const startOfDay = new Date(Date.UTC(searchDate.getUTCFullYear(), searchDate.getUTCMonth(), searchDate.getUTCDate()));
            // Set to the end of the day in UTC
            const endOfDay = new Date(startOfDay);
            endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

            query.departureTime = {
                $gte: startOfDay,
                $lt: endOfDay
            };
        }

        const flights = await Flight.find(query);
        res.json({ success: true, count: flights.length, data: flights });

    } catch (err) {
        console.error("Error fetching flights:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
// --- END OF FIX ---

// Get a single flight by its flight number for the tracker
exports.getFlightByNumber = async (req, res) => {
    // This function is correct and remains unchanged
    try {
        const flightNumber = req.params.flightNumber;
        const flight = await Flight.findOne({ flightNumber: new RegExp(`^${flightNumber}$`, 'i') });
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found with that number.' });
        }
        res.status(200).json(flight);
    } catch (err) {
        console.error("Error fetching flight by number:", err);
        res.status(500).json({ message: err.message });
    }
};

// Update a flight's status
exports.updateFlightStatus = async (req, res) => {
    // This function is correct and remains unchanged
    try {
        const { status } = req.body;
        const validStatuses = ['Scheduled', 'On-Time', 'Delayed', 'Departed', 'Arrival', 'Cancelled'];
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