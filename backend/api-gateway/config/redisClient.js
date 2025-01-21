// Import the ioredis library to interact with Redis
const Redis = require('ioredis');

// Create a new Redis client instance using environment variables
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost', // Redis server hostname (default: localhost)
    port: process.env.REDIS_PORT || 6379        // Redis server port (default: 6379)
});

// Log a message when connected successfully
redis.on('connect', () => {
    console.log('✅ Connected to Redis server');
});

// Log an error message if Redis connection fails
redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});

// Export the Redis client to be used in other parts of the application
module.exports = redis;
