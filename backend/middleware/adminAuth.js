// // backend/middleware/adminAuth.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const JWT_SECRET = "your_jwt_secret"; // Use same secret as auth.js

// // Middleware to verify JWT token
// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.userId);
    
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid token.' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token.' });
//   }
// };

// // Middleware to check if user is admin
// const verifyAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
//   }
//   next();
// };

// module.exports = { verifyToken, verifyAdmin };

// backend/middleware/adminAuth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify the JWT token and attach the user to the request
const verifyToken = async (req, res, next) => {
  let token;

  // Check for the token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // BUG FIX 1: Use the JWT_SECRET from your .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // BUG FIX 2: The user ID is inside 'decoded.user.id' based on our authController
      // Also, we select '-password' to exclude the password hash from the user object
      req.user = await User.findById(decoded.user.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'Not authorized, user not found' });
      }

      next(); // Move to the next middleware or the controller
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

// Middleware to check if the user has the 'admin' role
const verifyAdmin = (req, res, next) => {
  // This middleware should run AFTER verifyToken
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Not authorized as an admin' });
  }
};

module.exports = { verifyToken, verifyAdmin };
