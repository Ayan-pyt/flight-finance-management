const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // adjust path if needed

const JWT_SECRET = "your_jwt_secret"; // Use process.env.JWT_SECRET for production

// --- USER REGISTRATION ---
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Check if user already exists (case-insensitive)
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 3. Save new user
    const newUser = new User({ email: email.trim().toLowerCase(), password: hashedPassword });
    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// --- USER LOGIN ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find user by email
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // 3. Create and send JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
