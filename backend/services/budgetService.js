// backend/services/budgetService.js

// Import all the models we need for calculations
const Budget = require('../models/budgetModel');
const FuelCost = require('../models/fuelCostModel');
const Salary = require('../models/salaryModel');
const MaintenanceCost = require('../models/maintenanceCostModel');
const OperationalCost = require('../models/operationalCostModel');

/**
 * Calculates the current financial state (budget, spending, remaining).
 * @returns {Promise<Object>} An object with totalBudget, totalExpenses, and remainingBudget.
 */
const getFinancialState = async () => {
    const currentYear = new Date().getFullYear().toString();

    // Fetch the total allocated budget for the current year
    const budgetData = await Budget.findOne({ fiscalYear: currentYear });
    const totalBudget = budgetData ? budgetData.totalAmount : 0;

    // Fetch all expenses concurrently
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

    // Calculate total for each expense category (logic from your reportController)
    const totalFuelCost = fuelCosts.reduce((acc, item) => acc + (item.cost * item.liters), 0);
    const totalSalaryCost = salaries.reduce((acc, item) => acc + item.amount, 0);
    const totalMaintenanceCost = maintenanceCosts.reduce((acc, item) => acc + item.cost, 0);
    const totalOperationalCost = operationalCosts.reduce((acc, item) => acc + item.cost, 0);

    // Calculate the grand total of all expenses
    const totalExpenses = totalFuelCost + totalSalaryCost + totalMaintenanceCost + totalOperationalCost;
    
    // Calculate remaining budget
    const remainingBudget = totalBudget - totalExpenses;

    return { totalBudget, totalExpenses, remainingBudget };
};

/**
 * Checks if a new expense amount is affordable based on the remaining budget.
 * @param {number} newExpenseAmount The amount of the new expense to be added.
 * @returns {Promise<Object>} An object with canAfford: boolean and remainingBudget.
 */
const checkBudgetBeforeAddingExpense = async (newExpenseAmount) => {
    try {
        const { remainingBudget } = await getFinancialState();

        if (newExpenseAmount > remainingBudget) {
            return { canAfford: false, remainingBudget };
        }
        
        return { canAfford: true, remainingBudget };
    } catch (error) {
        console.error("Error in budget service:", error);
        // In case of error, default to failing the check to be safe
        return { canAfford: false, remainingBudget: 0 };
    }
};

module.exports = {
    checkBudgetBeforeAddingExpense,
};