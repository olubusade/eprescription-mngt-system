const mongoose = require('mongoose');

/**
 * Pharmacy Schema for MongoDB
 */
const PharmacySchema = new mongoose.Schema({
    name: String,
    location: String,
    stockCount: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
