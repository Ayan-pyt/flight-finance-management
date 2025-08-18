// backend/controllers/reportController.js

// Import all the cost models we need to read from
const FuelCost = require('../models/fuelCostModel');
const Salary = require('../models/salaryModel');
const MaintenanceCost = require('../models/maintenanceCostModel');
const OperationalCost = require('../models/operationalCostModel');

// @desc    Get a summary of all financial data
// @route   GET /api/reports/summary
// @access  Private/Admin
const getFinancialSummary = async (req, res) => {
    try {
        // Use Promise.all to fetch data from all collections simultaneously for efficiency
        const [
            fuelCosts,
            salaries,
            maintenanceCosts,
            operationalCosts
        ] = await Promise.all([
            FuelCost.find({}),
            Salary.find({}),
            MaintenanceCost.find({}),
            OperationalCost.find({})
        ]);

        // --- Calculate Totals ---

        // Calculate total fuel cost (cost per liter * liters)
        const totalFuelCost = fuelCosts.reduce((acc, item) => acc + (item.cost * item.liters), 0);

        // Calculate total salary cost
        const totalSalaryCost = salaries.reduce((acc, item) => acc + item.amount, 0);

        // Calculate total maintenance cost
        const totalMaintenanceCost = maintenanceCosts.reduce((acc, item) => acc + item.cost, 0);

        // Calculate total operational cost
        const totalOperationalCost = operationalCosts.reduce((acc, item) => acc + item.cost, 0);

        // Calculate the grand total
        const grandTotal = totalFuelCost + totalSalaryCost + totalMaintenanceCost + totalOperationalCost;

        // --- Construct the final report object ---
        const summary = {
            fuel: {
                totalCost: totalFuelCost,
                recordCount: fuelCosts.length,
            },
            salaries: {
                totalCost: totalSalaryCost,
                recordCount: salaries.length,
            },
            maintenance: {
                totalCost: totalMaintenanceCost,
                recordCount: maintenanceCosts.length,
            },
            operational: {
                totalCost: totalOperationalCost,
                recordCount: operationalCosts.length,
            },
            grandTotal: grandTotal,
        };

        res.status(200).json({ success: true, data: summary });

    } catch (error) {
        console.error('Error generating financial summary:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    getFinancialSummary,
};
