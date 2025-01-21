const express = require('express');
const { getDashboardData } = require('../controllers/dashboard.controller');

const router = express.Router();

/**
 * @route   GET /api/dashboard
 * @desc    Retrieve dashboard analytics data
 * @access  Private (Requires authentication)
 */
router.get('/', getDashboardData);

module.exports = router;
