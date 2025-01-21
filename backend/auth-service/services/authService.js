const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Generates a JWT token for authenticated users.
 */
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1hr' } // Token valid for 7 days
    );
};

/**
 * Registers a new user.
 */
const registerUser = async (name, email, password, role) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const user = new User({ name, email, password, role });
    await user.save();
    return { token: generateToken(user), user };
};

/**
 * Logs in an existing user.
 */
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid email or password');
    }
    return { token: generateToken(user), user };
};

module.exports = { registerUser, loginUser };
