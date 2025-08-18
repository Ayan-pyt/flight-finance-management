const mongoose = require('mongoose');

// Schema for a single salary payment entry
const salarySchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: [true, 'Employee name is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Salary amount is required'],
        min: [0, 'Amount cannot be negative'],
    },
    paymentDate: {
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

// Create the Salary model from the schema
const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;