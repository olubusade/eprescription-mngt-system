require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/mongoClient');
const redisClient = require('./config/redisClient'); // Redis Client

const inventoryRoutes = require('./routes/inventory.routes');

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
app.use('/api/pharmacy', inventoryRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Pharmacy Service running on port ${PORT}`));
