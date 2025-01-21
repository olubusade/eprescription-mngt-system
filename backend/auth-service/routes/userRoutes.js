const express = require('express');
const { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

const authenticateUser = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticateUser, authorizeRole(['admin']), getAllUsers);

// Get user by ID (Admin & User themselves)
router.get('/:id', authenticateUser, getUserById);

// Update user details (Admin & User themselves)
router.put('/:id', authenticateUser, updateUser);

// Delete user (Admin only)
router.delete('/:id', authenticateUser, authorizeRole(['admin']), deleteUser);

module.exports = router;
