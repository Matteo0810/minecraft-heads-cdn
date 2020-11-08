const redis = require('redis'),
    settings = require('./config'),
    client = redis.createClient(settings.redis_config);


client.on("error", (error) => console.error(error));

module.exports = { client };