const axios = require('axios');

module.exports = function getPlayerByUUID(name) {
    return new Promise(async resolve => {
        const { data } = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`);
        resolve(data.id);
    });
};