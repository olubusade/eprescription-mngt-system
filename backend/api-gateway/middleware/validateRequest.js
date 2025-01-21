/**
 * Middleware to validate request origin, API key, and JWT authentication.
 * Ensures security by preventing unauthorized access to API Gateway.
 */
const validateRequest = (req, res, next) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
    const origin = req.headers.origin;
    const apiKey = req.headers['x-api-key'];

    // Validate allowed origins
    if (!allowedOrigins.includes(origin)) {
        return res.status(403).json({ message: 'Forbidden: Unauthorized Origin' });
    }

    // Validate API Key
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
    }

    next();
};

module.exports = validateRequest;
