const redis = require('redis');
require('dotenv').config();

// Create a Redis client
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('✅ Redis: In-Memory Cache is connected and ready.');
});

// Connect to the cache
(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;