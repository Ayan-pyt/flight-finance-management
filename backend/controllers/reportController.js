// File: backend/controllers/reportController.js

const FuelCost = require('../models/fuelCostModel');
const Salary = require('../models/salaryModel');
const MaintenanceCost = require('../models/maintenanceCostModel');
const OperationalCost = require('../models/operationalCostModel');

// --- START OF NEW FUNCTION ---
// @desc    Get a summary of all financial data for the admin dashboard widgets
// @route   GET /api/reports/summary
// @access  Private/Admin
exports.getFinancialSummary = async (req, res) => {
    try {
        const [
            fuelCosts,
            salaries,
            maintenanceCosts,
            operationalCosts
        ] = await Promise.all([
            FuelCost.aggregate([ { $group: { _id: null, total: { $sum: { $multiply: ['$cost', '$liters'] } }, count: { $sum: 1 } } } ]),
            Salary.aggregate([ { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } } ]),
            MaintenanceCost.aggregate([ { $group: { _id: null, total: { $sum: '$cost' }, count: { $sum: 1 } } } ]),
            OperationalCost.aggregate([ { $group: { _id: null, total: { $sum: '$cost' }, count: { $sum: 1 } } } ])
        ]);

        const fuelSummary = fuelCosts[0] || { total: 0, count: 0 };
        const salarySummary = salaries[0] || { total: 0, count: 0 };
        const maintenanceSummary = maintenanceCosts[0] || { total: 0, count: 0 };
        const operationalSummary = operationalCosts[0] || { total: 0, count: 0 };

        const grandTotal = fuelSummary.total + salarySummary.total + maintenanceSummary.total + operationalSummary.total;

        const summary = {
            fuel: { totalCost: fuelSummary.total, recordCount: fuelSummary.count },
            salaries: { totalCost: salarySummary.total, recordCount: salarySummary.count },
            maintenance: { totalCost: maintenanceSummary.total, recordCount: maintenanceSummary.count },
            operational: { totalCost: operationalSummary.total, recordCount: operationalSummary.count },
            grandTotal,
        };

        res.status(200).json({ success: true, data: summary });
    } catch (error) {
        console.error('Error generating financial summary:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
// --- END OF NEW FUNCTION ---


// This function is for the pie chart and remains unchanged
exports.getExpenseSummary = async (req, res) => {
    try {
        const [
            fuelData,
            salaryData,
            maintenanceData,
            operationalData
        ] = await Promise.all([
            FuelCost.aggregate([ { $group: { _id: null, total: { $sum: { $multiply: ['$cost', '$liters'] } } } } ]),
            Salary.aggregate([ { $group: { _id: null, total: { $sum: '$amount' } } } ]),
            MaintenanceCost.aggregate([ { $group: { _id: null, total: { $sum: '$cost' } } } ]),
            OperationalCost.aggregate([ { $group: { _id: null, total: { $sum: '$cost' } } } ])
        ]);

        const summary = {
            fuel: fuelData[0]?.total || 0,
            salaries: salaryData[0]?.total || 0,
            maintenance: maintenanceData[0]?.total || 0,
            operational: operationalData[0]?.total || 0,
        };
        
        res.json({ success: true, data: summary });
    } catch (error) {
        console.error("Error fetching expense summary:", error);
        res.status(500).json({ success: false, message: 'Server error while fetching report data.' });
    }
};

// // backend/controllers/reportController.js

// // Import all the cost models we need to read from
// const FuelCost = require('../models/fuelCostModel');
// const Salary = require('../models/salaryModel');
// const MaintenanceCost = require('../models/maintenanceCostModel');
// const OperationalCost = require('../models/operationalCostModel');

// // @desc    Get a summary of all financial data
// // @route   GET /api/reports/summary
// // @access  Private/Admin
// const getFinancialSummary = async (req, res) => {
//     try {
//         // Use Promise.all to fetch data from all collections simultaneously for efficiency
//         const [
//             fuelCosts,
//             salaries,
//             maintenanceCosts,
//             operationalCosts
//         ] = await Promise.all([
//             FuelCost.find({}),
//             Salary.find({}),
//             MaintenanceCost.find({}),
//             OperationalCost.find({})
//         ]);

//         // --- Calculate Totals ---

//         // Calculate total fuel cost (cost per liter * liters)
//         const totalFuelCost = fuelCosts.reduce((acc, item) => acc + (item.cost * item.liters), 0);

//         // Calculate total salary cost
//         const totalSalaryCost = salaries.reduce((acc, item) => acc + item.amount, 0);

//         // Calculate total maintenance cost
//         const totalMaintenanceCost = maintenanceCosts.reduce((acc, item) => acc + item.cost, 0);

//         // Calculate total operational cost
//         const totalOperationalCost = operationalCosts.reduce((acc, item) => acc + item.cost, 0);

//         // Calculate the grand total
//         const grandTotal = totalFuelCost + totalSalaryCost + totalMaintenanceCost + totalOperationalCost;

//         // --- Construct the final report object ---
//         const summary = {
//             fuel: {
//                 totalCost: totalFuelCost,
//                 recordCount: fuelCosts.length,
//             },
//             salaries: {
//                 totalCost: totalSalaryCost,
//                 recordCount: salaries.length,
//             },
//             maintenance: {
//                 totalCost: totalMaintenanceCost,
//                 recordCount: maintenanceCosts.length,
//             },
//             operational: {
//                 totalCost: totalOperationalCost,
//                 recordCount: operationalCosts.length,
//             },
//             grandTotal: grandTotal,
//         };

//         res.status(200).json({ success: true, data: summary });

//     } catch (error) {
//         console.error('Error generating financial summary:', error);
//         res.status(500).json({ success: false, error: 'Server Error' });
//     }
// };

// module.exports = {
//     getFinancialSummary,
// };
