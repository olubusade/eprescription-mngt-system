const authService = require('../services/authService');
const redisClient = require('../config/redisClient');  // Import Redis Client

/**
 * Handles user registration.
 */
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists (Optional step)
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Register new user
        const response = await authService.registerUser(name, email, password, role);
        
        // Optional: Cache some user info in Redis (e.g., session data or user profile)
        // Example: Store basic user info like email in Redis with an expiration time of 1 hour
        redisClient.setex(`user:${email}`, 3600, JSON.stringify(response));

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Handles user login.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // First, check if session/user data exists in Redis
        redisClient.get(`user:${email}`, async (err, cachedUser) => {
            if (err) {
                return res.status(500).json({ error: 'Redis error' });
            }

            if (cachedUser) {
                // If user session exists in Redis, return cached data
                return res.status(200).json(JSON.parse(cachedUser));
            } else {
                // If no session in Redis, perform database login
                const response = await authService.loginUser(email, password);

                // Cache user session in Redis for 1 hour
                redisClient.setex(`user:${email}`, 3600, JSON.stringify(response));

                res.status(200).json(response);
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
