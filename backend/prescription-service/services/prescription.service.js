const Prescription = require('../models/prescription.model');
const redisClient = require('../config/redisClient');

class PrescriptionService {
    async getAllPrescriptions() {
        const cacheKey = 'prescriptions:all';
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const prescriptions = await Prescription.find().populate('patientId doctorId pharmacyId');
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(prescriptions)); // Cache for 1 hour
        return prescriptions;
    }

    async getPrescriptionById(id) {
        const cacheKey = `prescriptions:${id}`;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const prescription = await Prescription.findById(id).populate('patientId doctorId pharmacyId');
        if (prescription) {
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(prescription)); // Cache for 1 hour
        }
        return prescription;
    }

    async createPrescription(patientId, doctorId, pharmacyId, medications) {
        const newPrescription = new Prescription({
            patientId,
            doctorId,
            pharmacyId,
            medications
        });

        await newPrescription.save();
        await redisClient.del('prescriptions:all'); // Invalidate cache
        return newPrescription;
    }

    async updatePrescriptionStatus(id, status) {
        const updatedPrescription = await Prescription.findByIdAndUpdate(id, { status }, { new: true });
        if (updatedPrescription) {
            await redisClient.setEx(`prescriptions:${id}`, 3600, JSON.stringify(updatedPrescription));
            await redisClient.del('prescriptions:all'); // Invalidate cache
        }
        return updatedPrescription;
    }

    async deletePrescription(id) {
        const deletedPrescription = await Prescription.findByIdAndDelete(id);
        if (deletedPrescription) {
            await redisClient.del(`prescriptions:${id}`);
            await redisClient.del('prescriptions:all'); // Invalidate cache
        }
        return deletedPrescription;
    }
}

module.exports = new PrescriptionService();
