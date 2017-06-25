const Eris = require('eris');
const config = require('./config.json');
const requireDir = require('require-dir');

commandBot = new Eris.CommandClient(config.token, {}, {
	description: config.description,
	owner: config.owner,
	prefix: config.prefix,
	ignoreBots: config.ignoreBots,
});

responderBot = new Eris(config.token);

const dir1 = requireDir('./commands');
const dir2 = requireDir('./responder');

commandBot.on("ready", () => {
    console.log("Commands ready!");
});

responderBot.on("ready", () => {
    console.log("Responses ready!");
});

commandBot.connect();
responderBot.connect();