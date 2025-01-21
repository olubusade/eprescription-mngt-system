const User = require('../models/user');
const redisClient = require('../config/redisClient');

/**
 * Fetch all users from the database.
 */
const getAllUsers = async () => {
    return await User.find();
};

/**
 * Fetch a user by ID (Uses Redis caching).
 */
const getUserById = async (userId) => {
    const cachedUser = await redisClient.get(`user:${userId}`);
    
    if (cachedUser) {
        return JSON.parse(cachedUser);
    }

    const user = await User.findById(userId);

    if (user) {
        await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(user)); // Cache for 1 hour
    }

    return user;
};

/**
 * Update user details.
 */
const updateUser = async (userId, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (updatedUser) {
        await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(updatedUser)); // Update cache
    }

    return updatedUser;
};

/**
 * Delete a user.
 */
const deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (deletedUser) {
        await redisClient.del(`user:${userId}`); // Remove from cache
    }

    return deletedUser;
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
