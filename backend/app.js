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







// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/flightdb';

// if (!process.env.MONGO_URI) {
//     console.warn("Warning: MONGO_URI not found in .env file. Falling back to local MongoDB.");
// }

// mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("Successfully connected to MongoDB!"))
// .catch(err => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
// });

// // --- API Routes ---
// // Use the new authentication routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/bookings', require('./routes/bookings'));

// // Optional: Keep your other routes if they exist
// try {
//     app.use('/api/feedbacks', require('./routes/feedbacks'));
// } catch (e) {
//     console.log("Info: './routes/feedbacks.js' not loaded.");
// }


// app.get('/', (req, res) => {
//   res.send('Flight Finance Management System API is running.');
// });

// app.listen(PORT, () => {
//     console.log('Server running on http://localhost:${PORT}');
// });
