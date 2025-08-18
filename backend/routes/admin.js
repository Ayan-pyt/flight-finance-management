// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/adminAuth');

// Import your models
const FuelCostModel = require('../models/fuelCostModel'); // Adjust path as needed
const SalaryModel = require('../models/salaryModel'); // Adjust path as needed

// Apply middleware to all admin routes
router.use(verifyToken);
router.use(verifyAdmin);

// Get all fuel cost data (admin only)
router.get('/fuel-costs', async (req, res) => {
  try {
    const fuelCosts = await FuelCostModel.find().sort({ createdAt: -1 });
    res.json(fuelCosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching fuel costs' });
  }
});

// Get all salary data (admin only)
router.get('/salaries', async (req, res) => {
  try {
    const salaries = await SalaryModel.find().sort({ createdAt: -1 });
    res.json(salaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching salaries' });
  }
});

// Create/Update fuel cost (admin only)
router.post('/fuel-costs', async (req, res) => {
  try {
    const fuelCost = new FuelCostModel(req.body);
    await fuelCost.save();
    res.json({ message: 'Fuel cost created successfully', fuelCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating fuel cost' });
  }
});

// Create/Update salary (admin only)
router.post('/salaries', async (req, res) => {
  try {
    const salary = new SalaryModel(req.body);
    await salary.save();
    res.json({ message: 'Salary created successfully', salary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating salary' });
  }
});

// Get admin dashboard stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalFuelCosts = await FuelCostModel.countDocuments();
    const totalSalaries = await SalaryModel.countDocuments();
    
    // Add more stats as needed
    res.json({
      totalFuelCosts,
      totalSalaries,
      // Add more dashboard metrics
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching dashboard stats' });
  }
});

module.exports = router;