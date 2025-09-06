// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user',
//     }
// }, {
//     timestamps: true 
// });

// // This function runs BEFORE a user document is saved to the database
// userSchema.pre('save', async function(next) {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) {
//         return next();
//     }
//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // This method compares the entered password with the hashed password in the database
// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// // --- THE FIX ---
// // The model name is now capitalized ('User'). This is the correct convention.
// // const User = mongoose.model('User', userSchema);
// module.exports = mongoose.models.User || mongoose.model('User', userSchema);
// // module.exports = User;





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

// --- THE FIX ---
// This is the standard and safe way to export a Mongoose model with hot-reloading.
// It checks if the 'User' model already exists. If it does, it uses it. If not, it creates it.
module.exports = mongoose.models.User || mongoose.model('User', userSchema);