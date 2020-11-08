const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    settings = require('./config'),
    Response = require('./utils/Response'),
    cdnTimeStamp = require('./cdn/cdnTimeStamp'),
    playerUUID = require('./cdn/playerUUID'),
    Skull = require('./cdn/Skull'),
    app = express();

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('cors')());

app.all('/', (request, response) => response.send({ welcome: "Welcome to the cdn of HaivenStudio", version: 0.2, author: "Vidon" }));

app.all('/get/:timestamp/:image', async (request, response) => {
	const { timestamp, image } = request.params;
	if(!timestamp || !image) return response.json(Response.code(404, "TimeStamp or image not found."));
	if(timestamp === await cdnTimeStamp()) return response.json(Response.code(403, "TimeStamp are different."));

    response.sendFile(path.join(__dirname, `heads/${image}.png`), null, (error) => {
        if(error) return response.sendFile(path.join(__dirname, `heads/SteveDefault.png`));
    });
});

app.post('/put', async (request, response) => {
    const { name, token } = request.body;
    if(!name || !token) return response.json(Response.code(404, "Name or token are not defined."));
    if(settings.token !== token) return response.send(Response.code(403, "Invalid token."));
    const uuid =  await playerUUID(name);

    if(!uuid) return response.send({ code: 403, error: "UUID not found" });
    new Skull(uuid).save(name, response);
});

app.listen(settings.port, error => {
    if(error) return console.error();
    console.log(`App listening on ${settings.port}`);
});