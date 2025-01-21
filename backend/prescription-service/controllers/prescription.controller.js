const PrescriptionService = require('../services/prescription.service');

const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await PrescriptionService.getPrescriptionById(req.params.id);
        if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPrescription = async (req, res) => {
    try {
        const { patientId, doctorId, pharmacyId, medications } = req.body;
        const newPrescription = await PrescriptionService.createPrescription(patientId, doctorId, pharmacyId, medications);
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePrescriptionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedPrescription = await PrescriptionService.updatePrescriptionStatus(req.params.id, status);
        if (!updatedPrescription) return res.status(404).json({ message: 'Prescription not found' });
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePrescription = async (req, res) => {
    try {
        const deletedPrescription = await PrescriptionService.deletePrescription(req.params.id);
        if (!deletedPrescription) return res.status(404).json({ message: 'Prescription not found' });
        res.status(200).json({ message: 'Prescription deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllPrescriptions, getPrescriptionById, createPrescription, updatePrescriptionStatus, deletePrescription };
