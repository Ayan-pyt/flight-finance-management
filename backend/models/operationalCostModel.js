// backend/models/operationalCostModel.js

const mongoose = require('mongoose');

const operationalCostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Cost category is required'],
        enum: ['Airport Fees', 'Ground Handling', 'Navigation Fees'],
    },
    description: {
        type: String,
        required: [true, 'A description is required'],
        trim: true,
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
        min: [0, 'Cost cannot be negative'],
    },
    airportCode: {
        type: String,
        trim: true,
        uppercase: true,
        maxlength: [4, 'Airport code cannot be more than 4 characters'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot be more than 500 characters'],
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const OperationalCost = mongoose.model('OperationalCost', operationalCostSchema);

module.exports = OperationalCost;