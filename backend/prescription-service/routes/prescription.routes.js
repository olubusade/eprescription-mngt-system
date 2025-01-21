const express = require('express');
const { getAllPrescriptions, getPrescriptionById, createPrescription, updatePrescriptionStatus, deletePrescription } = require('../controllers/prescription.controller');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', authenticateUser, createPrescription);
router.put('/:id', authenticateUser, updatePrescriptionStatus);
router.delete('/:id', authenticateUser, deletePrescription);

module.exports = router;
