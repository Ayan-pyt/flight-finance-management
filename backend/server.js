// File: /backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db.js'); // Assuming db.js handles the connection

// Load environment variables from .env file at the very top
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Enable the express body parser to read JSON from request bodies
app.use(express.json());

// --- API Routes ---
// All your application routes are defined here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/salaries', require('./routes/salaryRoutes'));
app.use('/api/fuelcosts', require('./routes/fuelCostRoutes'));
app.use('/api/maintenancecosts', require('./routes/maintenanceCostRoutes'));
app.use('/api/operationalcosts', require('./routes/operationalCostRoutes'));

// --- START OF FIX ---
// CORRECTED: Changed the route from '/api/feedbacks' to '/api/feedback' (singular)
// to match what the frontend component is calling.
app.use('/api/feedback', require('./routes/feedbacks.js'));
// --- END OF FIX ---


// Health check route
app.get('/', (req, res) => {
    res.send('Flight Finance Management System API is running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));


// // File: /backend/server.js

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./db.js'); // Assuming db.js handles the connection

// // Load environment variables from .env file at the very top
// dotenv.config();

// // Connect to MongoDB Database
// connectDB();

// const app = express();

// // --- Middleware ---
// // Enable Cross-Origin Resource Sharing for all routes
// app.use(cors());
// // Enable the express body parser to read JSON from request bodies
// app.use(express.json());

// // --- API Routes ---
// // All your application routes are defined here
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/flights', require('./routes/flights'));
// app.use('/api/tickets', require('./routes/tickets'));
// app.use('/api/feedbacks', require('./routes/feedbacks.js'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/reports', require('./routes/reportRoutes'));
// app.use('/api/budget', require('./routes/budgetRoutes'));
// app.use('/api/salaries', require('./routes/salaryRoutes'));
// app.use('/api/fuelcosts', require('./routes/fuelCostRoutes'));
// app.use('/api/maintenancecosts', require('./routes/maintenanceCostRoutes'));
// app.use('/api/operationalcosts', require('./routes/operationalCostRoutes'));


// // Health check route
// app.get('/', (req, res) => {
//     res.send('Flight Finance Management System API is running.');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));