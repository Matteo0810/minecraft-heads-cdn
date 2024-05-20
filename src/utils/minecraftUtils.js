const fetch = require("node-fetch");
const { Buffer } = require("buffer");
const { bufferFromURL } = require("./imagesUtils");

async function getPlayerByUsername(username) {
    if(!username)
        throw new Error("Missing username.");
    const response = await fetch(`${process.env.MINECRAFT_USER_API_URL}/${username}`, {method: "GET"});
    return response.json();
}

async function getSkinTextures(uuid) {
    if(!uuid)
        throw new Error("Missing uuid.");
    const params = new URLSearchParams();
    params.set("unsigned", "false");
    const response = await fetch(`${process.env.MINECRAFT_SKULL_API_URL}/${uuid}?${params.toString()}`);
    const data = await response.json();
    if(!data?.properties || !data.properties.find(p => p.name === 'textures'))
        return null;
    const parsedData = JSON.parse(Buffer.from(data.properties.find(p => p.name === 'textures').value, 'base64').toString('utf-8'));
    return bufferFromURL(parsedData.textures.SKIN.url) ?? null;
}

module.exports = {
    getPlayerByUsername,
    getSkinTextures
}