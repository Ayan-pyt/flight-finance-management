// File: /backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/bookings', require('./routes/bookings')); // From our previous work
app.use('/api/feedback', require('./routes/feedbacks')); // From our previous work

// All your cost and management routes
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/salaries', require('./routes/salaryRoutes'));
app.use('/api/fuelcosts', require('./routes/fuelCostRoutes'));
app.use('/api/maintenancecosts', require('./routes/maintenanceCostRoutes'));
app.use('/api/operationalcosts', require('./routes/operationalCostRoutes'));

// NEW: Add the new report routes to the server
app.use('/api/reports', require('./routes/reportRoutes'));


app.get('/', (req, res) => {
    res.send('Flight Finance Management System API is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));