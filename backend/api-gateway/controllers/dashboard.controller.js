const axios = require('axios');
const redis = require('../config/redisClient');
// Import models
const Prescription = require('../models/prescription');
const Pharmacy = require('../models/pharmacy');
const User = require('../models/user');
/**
 * Fetches and aggregates dashboard data from multiple microservices.
 * Implements caching using Redis to improve performance.
 */
const getDashboardData = async (req, res) => {
    try {
        const cacheKey = 'dashboard_data';
        const cachedData = await redis.get(cacheKey);

        // Return cached data if available
        if (cachedData) return res.json(JSON.parse(cachedData));

        // Fetch data from MongoDB
        const [prescriptions, pharmacies, users] = await Promise.all([
            Prescription.countDocuments(),
            Pharmacy.countDocuments(),
            User.countDocuments()
        ]);

        const data = {
            totalPrescriptions: prescriptions,
            totalPharmacies: pharmacies,
            totalUsers: users
        };

        // Cache response in Redis for 5 minutes
        redis.set(cacheKey, JSON.stringify(data), 'EX', 300);
        res.json(data);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getDashboardData };
