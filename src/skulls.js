const fs = require("fs");
const SkullBuilder = require("./SkullBuilder");

async function exists(username) {
    return fs.existsSync(`${process.env.SKULLS_DIR}/${username}.png`);
}

async function get(username) {
    // if the requested username doesn't exists then try to save it
    try {
        if(!await exists(username))
            await save(username);
        return `${process.env.SKULLS_DIR}/${username}.png`;
    } catch(e) {
        console.trace(e);
    }
    // if we can't find it then just send default steve image
    return `${process.env.SKULLS_DIR}/_default.png`;
}

async function save(username) {
    const skull = await SkullBuilder.from(username);
    fs.writeFileSync(`${process.env.SKULLS_DIR}/${username}.png`, await skull.asBuffer());
}

module.exports = {
    save,
    get
}