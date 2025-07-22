require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js'); // or './config/db.js' if that's where your db file is

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


// Health check route (optional but good practice)
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
