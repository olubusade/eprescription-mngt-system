const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/mongoClient');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const initializeSocket = require('./config/socket');
const connectDB = require('./config/mongoClient'); // Mongo Client
const redisClient = require('./config/redisClient'); // Redis Client

const app = express();
const server = http.createServer(app);

//Conneect Redis
redisClient();
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Initialize WebSockets
initializeSocket(server);

const io = new Server(server, {
  cors: { origin: '*' },
});


// Start the Notification Service
const PORT = process.env.PORT || 5004;
server.listen(PORT, () => console.log(`🚀 Notification Service Running on Port ${PORT}`));