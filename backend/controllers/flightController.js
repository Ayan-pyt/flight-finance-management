// // File: /controllers/flightController.js

// const Flight = require('../models/flight');

// // This function is for PUBLIC/USER flight searches and correctly hides cancelled flights.
// exports.listFlights = async (req, res) => {
//     try {
//         const { from, to, date } = req.query;
//         // The query ALWAYS starts by filtering out cancelled flights for users.
//         const query = { status: { $ne: 'Cancelled' } };

//         if (from) { query.origin = { $regex: from, $options: 'i' }; }
//         if (to) { query.destination = { $regex: to, $options: 'i' }; }
//         if (date) {
//             const searchDate = new Date(date);
//             const startOfDay = new Date(Date.UTC(searchDate.getUTCFullYear(), searchDate.getUTCMonth(), searchDate.getUTCDate()));
//             const endOfDay = new Date(startOfDay);
//             endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);
//             query.departureTime = { $gte: startOfDay, $lt: endOfDay };
//         }
//         const flights = await Flight.find(query);
//         res.json({ success: true, count: flights.length, data: flights });
//     } catch (err) {
//         console.error("Error fetching flights for user:", err);
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

// // --- FIX for PROBLEM 3 ---
// // NEW FUNCTION: This is for ADMINS ONLY and fetches ALL flights, including cancelled ones.
// exports.listAllFlightsForAdmin = async (req, res) => {
//     try {
//         // No status filter here, so admins see everything.
//         const flights = await Flight.find({}).sort({ createdAt: -1 }); // Sort by newest first
//         res.json({ success: true, count: flights.length, data: flights });
//     } catch (err) {
//         console.error("Error fetching flights for admin:", err);
//         res.status(500).json({ success: false, message: "Server error fetching admin flight list." });
//     }
// };
// // --- END of FIX for PROBLEM 3 ---


// // This function for the tracker is correct.
// exports.getFlightByNumber = async (req, res) => {
//     try {
//         const flight = await Flight.findOne({ flightNumber: new RegExp(`^${req.params.flightNumber}$`, 'i') });
//         if (!flight) {
//             return res.status(404).json({ message: 'Flight not found with that number.' });
//         }
//         res.status(200).json(flight);
//     } catch (err) {
//         console.error("Error fetching flight by number:", err);
//         res.status(500).json({ message: err.message });
//     }
// };


// // --- FIX for PROBLEMS 1 & 2 ---
// // This function now correctly updates ONLY the status without triggering other validations.
// exports.updateFlightStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const validStatuses = ['On-Time', 'Delayed', 'Cancelled', 'Scheduled'];
//         if (!status || !validStatuses.includes(status)) {
//             return res.status(400).json({ message: 'Invalid or missing status provided.' });
//         }
        
//         // CORRECTED: We use findByIdAndUpdate to change only the specified field.
//         // The { new: true } option ensures the updated document is returned.
//         const updatedFlight = await Flight.findByIdAndUpdate(
//             req.params.id, 
//             { $set: { status: status } }, 
//             { new: true, runValidators: false } // 'runValidators: false' is the key to preventing the price error
//         );

//         if (!updatedFlight) {
//             return res.status(404).json({ message: 'Flight not found' });
//         }
//         res.json(updatedFlight);
//     } catch (error) {
//         console.error("Error updating flight status:", error);
//         res.status(500).json({ message: "Server error while updating status." });
//     }
// };
// // --- END of FIX for PROBLEMS 1 & 2 ---


// // This function is correct.
// exports.createFlight = async (req, res) => {
//     try {
//         const { flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;
//         if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !price) {
//             return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
//         }
//         const newFlight = new Flight({ flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable });
//         const savedFlight = await newFlight.save();
//         res.status(201).json({ success: true, message: 'Flight created successfully!', data: savedFlight });
//     } catch (err) {
//         console.error("Error creating flight:", err);
//         res.status(500).json({ success: false, message: err.message });
//     }
// };





// File: /controllers/flightController.js

const Flight = require('../models/flight');

// This function is for PUBLIC/USER flight searches
exports.listFlights = async (req, res) => {
    // ... (existing code, no changes)
    try {
        const { from, to, date } = req.query;
        const query = { status: { $ne: 'Cancelled' } };
        if (from) { query.origin = { $regex: from, $options: 'i' }; }
        if (to) { query.destination = { $regex: to, $options: 'i' }; }
        if (date) {
            const searchDate = new Date(date);
            const startOfDay = new Date(Date.UTC(searchDate.getUTCFullYear(), searchDate.getUTCMonth(), searchDate.getUTCDate()));
            const endOfDay = new Date(startOfDay);
            endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);
            query.departureTime = { $gte: startOfDay, $lt: endOfDay };
        }
        const flights = await Flight.find(query);
        res.json({ success: true, count: flights.length, data: flights });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// This function is for ADMINS ONLY and fetches ALL flights
exports.listAllFlightsForAdmin = async (req, res) => {
    // ... (existing code, no changes)
    try {
        const flights = await Flight.find({}).sort({ createdAt: -1 });
        res.json({ success: true, count: flights.length, data: flights });
    } catch (err) { res.status(500).json({ success: false, message: "Server error fetching admin flight list." }); }
};

// This function for the tracker is correct.
exports.getFlightByNumber = async (req, res) => {
    // ... (existing code, no changes)
    try {
        const flight = await Flight.findOne({ flightNumber: new RegExp(`^${req.params.flightNumber}$`, 'i') });
        if (!flight) { return res.status(404).json({ message: 'Flight not found with that number.' }); }
        res.status(200).json(flight);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// This function correctly handles the status update.
exports.updateFlightStatus = async (req, res) => {
    // ... (existing code, no changes)
    try {
        const { status } = req.body;
        const validStatuses = ['On-Time', 'Delayed', 'Cancelled', 'Scheduled'];
        if (!status || !validStatuses.includes(status)) { return res.status(400).json({ message: 'Invalid or missing status provided.' }); }
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, { $set: { status: status } }, { new: true, runValidators: false });
        if (!updatedFlight) { return res.status(404).json({ message: 'Flight not found' }); }
        res.json(updatedFlight);
    } catch (error) { res.status(500).json({ message: "Server error while updating status." }); }
};

// This function is correct.
exports.createFlight = async (req, res) => {
    // ... (existing code, no changes)
    try {
        const { flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable } = req.body;
        if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !price) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }
        const newFlight = new Flight({ flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable });
        const savedFlight = await newFlight.save();
        res.status(201).json({ success: true, message: 'Flight created successfully!', data: savedFlight });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};


// --- START OF NEW FEATURE ---
// NEW FUNCTION: This is for ADMINS ONLY and permanently deletes a flight.
exports.deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found.' });
        }

        res.status(200).json({ success: true, message: 'Flight deleted successfully.' });
    } catch (err) {
        console.error("Error deleting flight:", err);
        res.status(500).json({ message: 'Server error while deleting flight.' });
    }
};
// --- END OF NEW FEATURE ---