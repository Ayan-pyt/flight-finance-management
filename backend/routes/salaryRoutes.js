const express = require('express');
const router = express.Router();
const {
    createSalary,
    getSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
} = require('../controllers/salaryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Secure all routes for salaries, only accessible by admins
router.route('/')
    .get(protect, admin, getSalaries)
    .post(protect, admin, createSalary);

router.route('/:id')
    .get(protect, admin, getSalaryById)
    .put(protect, admin, updateSalary)
    .delete(protect, admin, deleteSalary);

module.exports = router;