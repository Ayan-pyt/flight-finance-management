// backend/controllers/operationalCostController.js

const OperationalCost = require('../models/operationalCostModel');

// @desc    Get all operational cost entries
// @route   GET /api/costs/operational
// @access  Private/Admin
const getOperationalCosts = async (req, res) => {
    try {
        const costs = await OperationalCost.find({}).sort({ date: -1 }); // Sort by newest first
        res.status(200).json({ success: true, count: costs.length, data: costs });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a new operational cost entry
// @route   POST /api/costs/operational
// @access  Private/Admin
const createOperationalCost = async (req, res) => {
    try {
        const newCost = await OperationalCost.create(req.body);
        res.status(201).json({ success: true, data: newCost });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update an operational cost entry
// @route   PUT /api/costs/operational/:id
// @access  Private/Admin
const updateOperationalCost = async (req, res) => {
    try {
        const cost = await OperationalCost.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the modified document
            runValidators: true, // Run schema validators on update
        });

        if (!cost) {
            return res.status(404).json({ success: false, error: 'Operational cost record not found' });
        }
        res.status(200).json({ success: true, data: cost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete an operational cost entry
// @route   DELETE /api/costs/operational/:id
// @access  Private/Admin
const deleteOperationalCost = async (req, res) => {
    try {
        const cost = await OperationalCost.findByIdAndDelete(req.params.id);

        if (!cost) {
            return res.status(404).json({ success: false, error: 'Operational cost record not found' });
        }
        res.status(200).json({ success: true, data: {} }); // Send back empty object on success
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


module.exports = {
    getOperationalCosts,
    createOperationalCost,
    updateOperationalCost,
    deleteOperationalCost,
};
