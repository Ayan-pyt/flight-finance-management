// backend/models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  // It's good practice to link to the actual user if they are logged in
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: false, // Not all feedback will be from logged-in users
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
  },
  flightNumber: {
    type: String,
    required: false, // Optional, user might not remember
    trim: true,
    uppercase: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    required: [true, 'Please provide your feedback'],
    trim: true,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Feedback', FeedbackSchema);