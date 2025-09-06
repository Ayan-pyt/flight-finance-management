// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure your path to the User model is correct

const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by the ID stored in the token and attach it to the request
            req.user = await User.findById(decoded.id).select('-password');
            
            next(); // Move to the next middleware or the route handler
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    // This middleware should run *after* the 'auth' middleware
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed
    } else {
        // User is not an admin, send a forbidden error
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

// Make sure both functions are exported
module.exports = { auth, admin };