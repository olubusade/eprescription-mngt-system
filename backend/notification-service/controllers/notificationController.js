const notificationService = require('../services/notificationService');

/**
 * Get all notifications for a user.
 */
const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getUserNotifications(req.user.id);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Mark a notification as read.
 */
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotification = await notificationService.markAsRead(id);
        if (!updatedNotification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getNotifications, markAsRead };
