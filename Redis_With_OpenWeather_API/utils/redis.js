const Redis = require('ioredis');
const { settings } = require('../settings/application');

const redis = new Redis({
  host: settings.redis.cient_host,
  port: settings.redis.client_port,
  username: settings.redis.client_username,
  password: settings.redis.client_password,
//   tls: {} // Redis Cloud requires TLS
});

// const client = new Redis()

redis.on('connect', () => {
  console.log('Connected to Redis Cloud');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});



module.exports = redis