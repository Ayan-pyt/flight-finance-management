require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/feedback', require('./routes/feedbacks.js'));

// ADDED: Import and use the new cost management routes
app.use('/api', require('./routes/costRoutes'));

// NEW: Admin routes for sensitive data
app.use('/api/admin', require('./routes/admin'));

app.use('/api/reports', require('./routes/reportRoutes'));

// Health check route (optional but good practice)
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));