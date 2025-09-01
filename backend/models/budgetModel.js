const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    fiscalYear: {
        type: String,
        required: [true, 'Fiscal year is required (e.g., "2025")'],
        unique: true, // Ensures only one budget document per year
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total budget amount is required'],
        min: [0, 'Budget amount cannot be negative'],
    },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;