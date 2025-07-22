// routes/feedbacks.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { flightNumber, name, email, feedback } = req.body;
    if (!flightNumber || !name || !email || !feedback) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const fb = new Feedback({ flightNumber, name, email, feedback });
    await fb.save();
    res.json({ message: "Feedback submitted!" });
  } catch (err) {
    // ⬇️ Place this line here! (inside catch)
    console.error('Feedback save error:', err);
    res.status(500).json({ error: "Server error saving feedback." });
  }
});

module.exports = router;
