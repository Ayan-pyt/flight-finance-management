const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/flightdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Feedback routes
const feedbackRoutes = require('./routes/feedbacks');
app.use('/api/feedbacks', feedbackRoutes);

// Booking routes (NEW)
const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);

// Auth routes (if you have them)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Flight Finance Management System API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


