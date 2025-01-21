require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/mongoClient'); // MongoDB Connection
const dashboardRoutes = require('./routes/dashboard.routes');
const validateRequest = require('./middleware/validateRequest');
const proxyService = require('./services/proxyService');
const redis = require('./config/redisClient'); // Redis Client

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Connect MongoDB
connectDB();

//Conneect Redis

// Example: Set a key in Redis
/*
redis.set('test_key', 'test_value', (err, result) => {
  if (err) {
      console.error('Error setting Redis value:', err);
  } else {
      console.log('Redis value set:', result);
  }
});
*/
// Example: Get a key from Redis
redis.get('test_key', (err, result) => {
  if (err) {
      console.error('Error getting Redis value:', err);
  } else {
      console.log('Redis value:', result); // Should print 'test_value'
  }
});

// Apply security validation to all requests
app.use(validateRequest);

// API Routes
app.use('/api/dashboard', dashboardRoutes);

// Proxy Routes (Microservices)
app.use('/api/users', proxyService(process.env.AUTH_SERVICE_URL));
app.use('/api/prescriptions', proxyService(process.env.PRESCRIPTION_SERVICE_URL));
app.use('/api/pharmacy', proxyService(process.env.PHARMACY_SERVICE_URL));

// Start the API Gateway Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
