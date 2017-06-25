commandBot.registerCommand("lmgtfy", (msg, args) => {
    if(args.length === 0) {
        return "Invalid input";
    }
	var text = "http://lmgtfy.com/?q="+encodeURIComponent(msg.content.replace(/^[^ ]* /, ''));
    return text;
},	{
	description: "Was that so hard?",
	fullDescription: "The bot will create an LMGTFY link.",
	usage: "<text>",
	caseInsensitive: true
});