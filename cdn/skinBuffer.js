const imageBase64 = require('./imageBase64'),
    axios = require('axios');

module.exports = async function getSkinBuffer(uuid) {
    const { data } = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}?unsigned=false`);
    if (!data || !data.properties || !data.properties.find(p => p.name === 'textures')) return null;
    const parsedData = JSON.parse(Buffer.from(data.properties.find(p => p.name === 'textures').value, 'base64').toString('utf-8'));

    return parsedData.textures.SKIN ? await imageBase64(parsedData.textures.SKIN.url) : null;
};