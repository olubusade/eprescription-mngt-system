export const environment = {
    production: false, // Set to false for development
    apiUrl: 'http://localhost:5000', // API endpoint for local development
    redisUrl: 'redis://localhost:6379', // Redis connection URL for local development
    jwtSecret: 'your-development-jwt-secret', // Secret key for JWT (for dev purposes only),
    apiKey: 'your-secure-api-key' // Must match backend API key
  };
  