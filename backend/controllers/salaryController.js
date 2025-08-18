const Salary = require('../models/salaryModel');

// @desc    Create a new salary entry
// @route   POST /api/salaries
// @access  Private (e.g., admin only)
const createSalary = async (req, res) => {
    try {
        const salary = await Salary.create(req.body);
        res.status(201).json({ success: true, data: salary });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get all salary entries
// @route   GET /api/salaries
// @access  Private
const getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find({});
        res.status(200).json({ success: true, data: salaries });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get a single salary entry by ID
// @route   GET /api/salaries/:id
// @access  Private
const getSalaryById = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) {
            return res.status(404).json({ success: false, error: 'Salary not found' });
        }
        res.status(200).json({ success: true, data: salary });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update a salary entry
// @route   PUT /api/salaries/:id
// @access  Private
const updateSalary = async (req, res) => {
    try {
        const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!salary) {
            return res.status(404).json({ success: false, error: 'Salary not found' });
        }
        res.status(200).json({ success: true, data: salary });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete a salary entry
// @route   DELETE /api/salaries/:id
// @access  Private
const deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findByIdAndDelete(req.params.id);
        if (!salary) {
            return res.status(404).json({ success: false, error: 'Salary not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    createSalary,
    getSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
};