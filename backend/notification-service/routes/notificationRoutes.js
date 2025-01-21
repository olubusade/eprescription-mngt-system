const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, getNotifications);
router.put('/:id', authenticateUser, markAsRead);

module.exports = router;
