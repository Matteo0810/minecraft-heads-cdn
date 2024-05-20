const {getPlayerByUsername, getSkinTextures} = require("./utils").minecraft;
const {cropImage} = require("./utils").images;
const sharp = require("sharp");

module.exports = class SkullBuilder {

    _player;

    constructor(player) {
        this._player = player;
    }

    static async from(username) {
        if(!username)
            throw new Error("Missing username.");
        const player = await getPlayerByUsername(username);
        if(!player)
            throw new Error(`Player not found for username: '${username}'`);
        return new SkullBuilder(player);
    }

    async _extractLayerTexture(textures) {
        const croppedImage = await cropImage(textures, 40, 8, 8, 8);
        return sharp(croppedImage)
            .resize({ width: 296, kernel: 'nearest' })
            .toBuffer();
    }

    async _extractBaseTexture(textures) {
        return cropImage(textures, 8, 8, 8, 8);
    }

    async asBuffer() {
        const textures = await getSkinTextures(this._player.id);
        if(!textures)
            throw new Error(`Cannot find textures for UUID: ${this._player.id}`);
        const layerTexture = await this._extractLayerTexture(textures);
        const baseTexture = await this._extractBaseTexture(textures);

        return sharp(baseTexture)
            .resize({ width: 280, kernel: 'nearest' })
            .extend({ top: 8, bottom: 8, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .composite([{ input: layerTexture, gravity: 'north', top: 2, left: -1 }])
            .toBuffer();
    }

}