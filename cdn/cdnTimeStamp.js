const { client } = require('../RedisManager');

module.exports = function getCDNTimeStamp() {
    return new Promise(resolve => {
        client.keys(`index:cdn:*`, (error, keys) => {
            if(error) return console.error;
            client.get(keys[0], (error, key) => {
                if(error) return console.error;
                resolve(JSON.parse(key).timeStamp);
            });
        })
    });
};