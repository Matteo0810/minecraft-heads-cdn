const fetch = require("node-fetch");
const Jimp = require("jimp");

async function bufferFromURL(url) {
    const response = await fetch(url, {method: "GET"});
    const data = await response.arrayBuffer();
    const headers = response.headers;
    if (!headers.get("content-type").startsWith('image')) 
        return null;
    return Buffer.from(data);
}

function cropImage(buffer, x, y, w, h) {
    return new Promise((resolve, reject) => {
        Jimp.read(buffer).then(img => {
            img.crop(x, y, w, h);
            img.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
                if(error) 
                    reject(e);
                resolve(buffer);
            });
        }).catch(e => reject(e));
    });
}

module.exports = {
    bufferFromURL,
    cropImage
}