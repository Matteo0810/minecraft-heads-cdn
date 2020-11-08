const { client } = require('./RedisManager');

function init() {
    setInterval(() => {
        const dateTime = new Date().getTime();
        deleteKeys();
        client.set(`index:cdn:${dateTime}`, JSON.stringify({ timeStamp: dateTime }));
    }, 8.64e7);
    //1 day = 8.64e7
}

function deleteKeys() {
    client.keys('index:cdn:*', (error, keys) => {
        if(error) return console.error;
        keys.forEach(key => client.del(key));
    });
}

module.exports = { init };