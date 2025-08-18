// backend/models/maintenanceCostModel.js

const mongoose = require('mongoose');

const maintenanceCostSchema = new mongoose.Schema({
    aircraftId: {
        type: String,
        required: [true, 'Aircraft ID or tail number is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'A description of the maintenance is required'],
        trim: true,
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
        min: [0, 'Cost cannot be negative'],
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

const MaintenanceCost = mongoose.model('MaintenanceCost', maintenanceCostSchema);

module.exports = MaintenanceCost;