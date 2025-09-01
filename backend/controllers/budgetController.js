const Budget = require('../models/budgetModel');

// @desc    Set or update the budget for a fiscal year
// @route   POST /api/budget
// @access  Private/Admin
const setBudget = async (req, res) => {
    try {
        const { fiscalYear, totalAmount } = req.body;

        if (!fiscalYear || totalAmount === undefined) {
            return res.status(400).json({ success: false, error: 'Fiscal year and total amount are required.' });
        }
        
        // Find the budget for the given year and update it, or create it if it doesn't exist.
        const budget = await Budget.findOneAndUpdate(
            { fiscalYear: fiscalYear },
            { totalAmount: totalAmount },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(201).json({ success: true, data: budget });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get the budget for a specific fiscal year
// @route   GET /api/budget/:year
// @access  Private/Admin
const getBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({ fiscalYear: req.params.year });

        if (!budget) {
            // It's not an error if a budget isn't set, just return an empty object or a default
            return res.status(200).json({ success: true, data: { fiscalYear: req.params.year, totalAmount: 0 } });
        }

        res.status(200).json({ success: true, data: budget });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    setBudget,
    getBudget,
};