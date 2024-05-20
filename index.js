const express = require("express");
const path = require("path");
const cors = require("cors");

const skulls = require("./src/skulls");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/:username', async (req, res) => {
    const username = req?.params?.username;
    if(!username)
        return res.json({ error: "Missing username.", code: 400 });
    res.sendFile(path.join(__dirname, await skulls.get(username)), error => {
        if(error)
            return res.json({ error, code: 500 });
    });
});

app.post("/", async (req, res) => {
    let token = req.headers.authorization || "";
    token = token.split(" ").pop();
    if(!token)
        return res.json({ error: "Missing authorization.", code: 400 });
    if(token !== process.env.AUTHORIZATION_TOKEN)
        return res.json({ error: "Invalid authorization", code: 403 });
    const username = req.body?.username;
    if(!username)
        return res.json({ error: "Missing username.", code: 400 });
    try {
        await skulls.save(username);
        return res.json({ success: true, code: 200 });
    } catch(e) {
        return res.json({ error: e, code: 500 });
    }
});

app.listen(process.env.APP_PORT, error => {
    if(error)
        console.error(error);
    else
        console.log(`⚡️ App listening to http://localhost:${process.env.APP_PORT}`);
});