require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/mongoClient');
const redisClient = require('./config/redisClient'); // Redis Client

const prescriptionRoutes = require('./routes/prescription.routes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Connect MongoDB
connectDB();
//Connect Redis
redisClient();

// Routes
app.use('/api/prescriptions', prescriptionRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Prescription Service running on port ${PORT}`));
