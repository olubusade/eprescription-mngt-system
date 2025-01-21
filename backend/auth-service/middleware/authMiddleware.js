const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate requests using JWT.
 */
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing Token' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
};

module.exports = authenticateUser;
