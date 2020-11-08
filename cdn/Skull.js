const skinBuffer = require('./skinBuffer'),
    sharp = require('sharp'),
    jimp = require('jimp');

module.exports = class Skull {

    constructor(uuid) {
        this.uuid = uuid;
        this.minePNG = jimp.MIME_PNG;
        this.resizeOption = { width: 295, kernel: 'nearest' };
    }

    async setSkinBuffer() {
        this.skinBuffer = await skinBuffer(this.uuid);
    }

    async getSkullLayer() {
        this.setSkinBuffer();

        return new Promise(async resolve => {
            const image = await jimp.read(this.skinBuffer);

            image.crop(40, 8, 8, 8);
            image.getBuffer(this.minePNG, async (error, buffer) => {
                if(error) return console.error(error);
                resolve(await sharp(buffer).resize(this.resizeOption).toBuffer());
            });
        });
    }

    getSkull() {
        return new Promise(async resolve => {
            const image = await jimp.read(this.skinBuffer);

            image.crop(8, 8, 8, 8);
            image.getBuffer(this.minePNG, (error, buffer) => {
                if(error) return console.error(error);
                resolve(buffer);
            });
        });
    }

    async save(name, response) {
        const skullBuffer = await this.getSkull(),
            skullLayerBuffer = await this.getSkullLayer();

        sharp(skullBuffer)
            .resize({ width: 280, kernel: 'nearest' })
            .extend({ top: 8, bottom: 8, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .composite([{ input: skullLayerBuffer, gravity: 'north' }])
            .toFile(`./heads/${name}.png`);

        response.send(Response.code(400, "Head saved !", name))
    }

};