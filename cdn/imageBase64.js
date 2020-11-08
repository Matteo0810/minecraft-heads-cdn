const axios = require('axios'),
    { Buffer } = require('buffer');

module.exports = async function getImageBase64(url) {
    const { data, headers } = await axios.get(url, { responseType: 'arraybuffer' });
    if (!headers['content-type'].startsWith('image')) return null;
    return Buffer.from(data).toString('base64');
};