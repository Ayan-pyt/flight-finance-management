// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//     const { email, password, role } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: 'User already exists' });

//         user = new User({
//             email,
//             password,
//             role
//         });

//         await user.save();

//         res.status(201).json({ id: user._id, email: user.email, role: user.role });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };




// backend/controllers/authController.js

// This is the FIX: Changed '../models/user' to '../models/User'
// backend/controllers/authController.js

// THE FINAL FIX: Changed '../models/User' to '../models/user' to match your filename.
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// --- USER REGISTRATION LOGIC ---
const registerUser = async (req, res) => {
  // Get user details from the request body
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide name, email, and password." });
  }

  try {
    // Check if a user with that email already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already registered." });
    }

    // Create a new user instance
    // (This assumes you have a pre-save hook in your User model to hash the password)
    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "Registration successful. You can now log in." });

  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ msg: "Server error during registration." });
  }
};


// --- USER LOGIN LOGIC ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored password
    // (This assumes you have a method called 'matchPassword' in your User model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials.' });
    }

    // If credentials are correct, create a JSON Web Token
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Make sure your User model has a 'role' field
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // IMPORTANT: Use the secret from your .env file
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        // Send the token and user info back to the client
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error during login." });
  }
};


// Export the functions to be used in the routes file
module.exports = {
  registerUser,
  loginUser,
};
