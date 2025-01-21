const mongoose = require('mongoose');

/**
 * User Schema for MongoDB
 */
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, enum: ['doctor', 'pharmacist'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
