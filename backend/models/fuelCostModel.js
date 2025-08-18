const mongoose = require('mongoose');

// Schema for a single fuel cost entry
const fuelCostSchema = new mongoose.Schema({
    fuelType: {
        type: String,
        required: [true, 'Fuel type is required'],
        enum: ['Jet A-1', 'Avgas'], // Example fuel types
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
        min: [0, 'Cost cannot be negative'],
    },
    liters: {
        type: Number,
        required: [true, 'Liters are required'],
        min: [0, 'Liters cannot be negative'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot be more than 500 characters'],
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the FuelCost model from the schema
const FuelCost = mongoose.model('FuelCost', fuelCostSchema);

module.exports = FuelCost;