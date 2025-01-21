const Notification = require('../models/Notification');

/**
 * Save a new notification in the database.
 */
const saveNotification = async (userId, message, type) => {
    return await Notification.create({ userId, message, type });
};

/**
 * Fetch unread notifications for a user.
 */
const getUserNotifications = async (userId) => {
    return await Notification.find({ userId, read: false }).sort({ createdAt: -1 });
};

/**
 * Mark notifications as read.
 */
const markAsRead = async (notificationId) => {
    return await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
};

module.exports = { saveNotification, getUserNotifications, markAsRead };
