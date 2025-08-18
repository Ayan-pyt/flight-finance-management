const FuelCost = require('../models/fuelCostModel');

// @desc    Create a new fuel cost entry
// @route   POST /api/fuelcosts
// @access  Private (e.g., admin only)
const createFuelCost = async (req, res) => {
    try {
        const fuelCost = await FuelCost.create(req.body);
        res.status(201).json({ success: true, data: fuelCost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get all fuel cost entries
// @route   GET /api/fuelcosts
// @access  Private
const getFuelCosts = async (req, res) => {
    try {
        const fuelCosts = await FuelCost.find({});
        res.status(200).json({ success: true, data: fuelCosts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get a single fuel cost entry by ID
// @route   GET /api/fuelcosts/:id
// @access  Private
const getFuelCostById = async (req, res) => {
    try {
        const fuelCost = await FuelCost.findById(req.params.id);
        if (!fuelCost) {
            return res.status(404).json({ success: false, error: 'Fuel cost not found' });
        }
        res.status(200).json({ success: true, data: fuelCost });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update a fuel cost entry
// @route   PUT /api/fuelcosts/:id
// @access  Private
const updateFuelCost = async (req, res) => {
    try {
        const fuelCost = await FuelCost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!fuelCost) {
            return res.status(404).json({ success: false, error: 'Fuel cost not found' });
        }
        res.status(200).json({ success: true, data: fuelCost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete a fuel cost entry
// @route   DELETE /api/fuelcosts/:id
// @access  Private
const deleteFuelCost = async (req, res) => {
    try {
        const fuelCost = await FuelCost.findByIdAndDelete(req.params.id);
        if (!fuelCost) {
            return res.status(404).json({ success: false, error: 'Fuel cost not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    createFuelCost,
    getFuelCosts,
    getFuelCostById,
    updateFuelCost,
    deleteFuelCost,
};