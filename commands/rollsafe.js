commandBot.registerCommand("rollsafe", (msg, args) => {
    if(args.length === 0) {
        return "Invalid input";
    } else {
		var text = "https://memegen.link/rollsafe/";
		for (var i = 0; i < args.length; i++) {
			text += args[i];
			if (i < (args.length - 1)) {
				text += "-";
			}
		}
		text += ".jpg";
		return text;
	}
},	{
	description: "Make a think about it meme",
	fullDescription: "The bot will create a link for a \"think about it\"/\"rollsafe\" image macro meme.",
	usage: "<text>/<text>",
	caseInsensitive: true
});