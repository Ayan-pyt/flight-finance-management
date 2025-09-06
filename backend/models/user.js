// File: backend/models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    // This ensures the roles are consistent with your application logic
    role: {
        type: String,
        enum: ['passenger', 'admin'],
        default: 'passenger',
    }
}, {
    timestamps: true 
});

// This pre-save hook for hashing passwords is correct and does not need changes.
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// It checks if the 'User' model already exists. If it does, it uses it. If not, it creates it.
module.exports = mongoose.models.User || mongoose.model('User', userSchema);