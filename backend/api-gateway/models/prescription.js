const mongoose = require('mongoose');

/**
 * Prescription Schema for MongoDB
 */
const PrescriptionSchema = new mongoose.Schema({
    patientName: String,
    doctorId: mongoose.Schema.Types.ObjectId,
    medications: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
