// backend/controllers/maintenanceCostController.js

const MaintenanceCost = require('../models/maintenanceCostModel'); //
const { checkBudgetBeforeAddingExpense } = require('../services/budgetService');

// @desc    Get all maintenance cost entries
// @route   GET /api/costs/maintenance
// @access  Private/Admin
const getMaintenanceCosts = async (req, res) => { //
    try { //
        const costs = await MaintenanceCost.find({}).sort({ date: -1 }); // Sort by newest first
        res.status(200).json({ success: true, count: costs.length, data: costs }); //
    } catch (error) { //
        res.status(500).json({ success: false, error: 'Server Error' }); //
    } //
};

// @desc    Create a new maintenance cost entry
// @route   POST /api/costs/maintenance
// @access  Private/Admin
const createMaintenanceCost = async (req, res) => {
    try {
        // --- NEW: Budget Check Logic ---
        const { cost } = req.body;
        const newExpenseAmount = Number(cost) || 0;

        const { canAfford, remainingBudget } = await checkBudgetBeforeAddingExpense(newExpenseAmount);

        if (!canAfford) {
            return res.status(400).json({
                success: false,
                error: `Cannot add expense. The cost of ${newExpenseAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} exceeds the remaining budget of ${remainingBudget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`
            });
        }
        
        // --- END: Budget Check Logic ---

        const newCost = await MaintenanceCost.create(req.body); //
        res.status(201).json({ success: true, data: newCost }); //
    } catch (error) { //
        // Handle validation errors
        if (error.name === 'ValidationError') { //
            const messages = Object.values(error.errors).map(val => val.message); //
            return res.status(400).json({ success: false, error: messages }); //
        } //
        res.status(400).json({ success: false, error: error.message }); //
    } //
};

// @desc    Update a maintenance cost entry
// @route   PUT /api/costs/maintenance/:id
// @access  Private/Admin
const updateMaintenanceCost = async (req, res) => { //
    try { //
        const cost = await MaintenanceCost.findByIdAndUpdate(req.params.id, req.body, { //
            new: true, // Return the modified document
            runValidators: true, // Run schema validators on update
        }); //

        if (!cost) { //
            return res.status(404).json({ success: false, error: 'Maintenance record not found' }); //
        } //
        res.status(200).json({ success: true, data: cost }); //
    } catch (error) { //
        res.status(400).json({ success: false, error: error.message }); //
    } //
};

// @desc    Delete a maintenance cost entry
// @route   DELETE /api/costs/maintenance/:id
// @access  Private/Admin
const deleteMaintenanceCost = async (req, res) => { //
    try { //
        const cost = await MaintenanceCost.findByIdAndDelete(req.params.id); //

        if (!cost) { //
            return res.status(404).json({ success: false, error: 'Maintenance record not found' }); //
        } //
        res.status(200).json({ success: true, data: {} }); // Send back empty object on success
    } catch (error) { //
        res.status(500).json({ success: false, error: 'Server Error' }); //
    } //
};


module.exports = { //
    getMaintenanceCosts, //
    createMaintenanceCost, //
    updateMaintenanceCost, //
    deleteMaintenanceCost, //
};