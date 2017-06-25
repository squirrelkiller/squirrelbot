const config = require('../config.json').responder;

//Creates the bot
var serversToRunIn = config.serversToRunIn; //Servers where this bot works.
var channelsToRunIn = config.channelsToRunIn; //Specific channels where this bot works.
var adminUsers = config.adminUsers; //Users who may use admin commands.
var channelsWithoutRestriction = config.noLimits; //Channels in which spam heavy usage, such as dump command and responding to every message without timer are allowed.
var channelsToIgnore = config.ignore; //The bot will completely ignore these channels.

var channelsVisited = []; //Channels the bot has ran in.

const responseTimer = config.timer; //Time until the bot may react to a certain type of message again.

//Contains all the information for each response type. This array contains objects that contain the regex for each checked for response, the reactions to respond with, and the time when they were last used.
var responses = config.responses;


//Generic image randomizer.
function randomImage(images) {
	return images[Math.floor((Math.random() * images.length))];
}
//responses[i].reactions
//Creates an embedded image object.
function createEmbedImage(msg, imageToEmbed) {
	return {embed:{image:{url:imageToEmbed}}};
}

//Takes the responses regex arrays and converts the strings properly to be a regex.
for (i = 0; i < responses.length; i++) {
	for (i2 = 0; i2 < responses[i].regex.length; i2++) {
		responses[i].regex[i2] = new RegExp(responses[i].regex[i2], "i");
	}
}

responderBot.on("messageCreate", (msg) => { //looks for a message to be made
	
	var validChat = Boolean((serversToRunIn.indexOf(msg.channel.guild.id) != -1 || channelsToRunIn.indexOf(msg.channel.id) != -1) && !(channelsToIgnore.indexOf(msg.channel.id) != -1)); //performs tests to make sure that the current chat is a valid chat to respond in.
	
	if (msg.author.bot == false && validChat) { //restricts to certain chats and from bots.
		
		//If this is the first time the bot checks a valid channel it prepares the responses.last object for each response object for that channel.
		if (channelsVisited.indexOf(msg.channel.id) == -1) {
			for (i = 0; i < responses.length; i++) {
				if (!responses[i].last.hasOwnProperty(msg.channel.id)) {
					responses[i].last[msg.channel.id] = 0;
				}
			}
		}
		//Iterates through each object within the array and tests them.
		for (i = 0; i < responses.length; i++) {
			if (Date.now() - responses[i].last[msg.channel.id] > responseTimer || channelsWithoutRestriction.indexOf(msg.channel.id) != -1) { //Sees if the timer has ran out on a response, if it has then it allows the bot to respond again. If the channel is without restrictions than it ignores the timer completely.
				for (i2 = 0; i2 < responses[i].regex.length; i2++) {
					if (msg.author.bot == false && msg.content.match(responses[i].regex[i2])) { //Iterates through each regex to see if it is in the message.
						responses[i].last[msg.channel.id] = Date.now(); //updates time match was last used.
						responderBot.createMessage(msg.channel.id, createEmbedImage(msg, randomImage(responses[i].reactions))); //Random output from reaction array.
						break;
					}
				}
			}
		}
	}
});