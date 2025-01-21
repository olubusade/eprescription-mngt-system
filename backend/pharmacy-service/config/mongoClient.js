const mongoose = require('mongoose');

/**
 * Connects to MongoDB using Mongoose.
 * Logs connection status and handles errors.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected...');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;
