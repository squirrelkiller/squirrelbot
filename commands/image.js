//TODO: Modify so that it creates commands directly rather than making them an argument to "image".

const imageCollection = config.images;
const imageCollectionKeys = Object.keys(imageCollection);

//Generic image randomizer.
function randomImage(images) {
	return images[Math.floor((Math.random() * images.length))];
}

//Creates an embedded image object.
function createEmbedImage(msg, imageToEmbed) {
	return {embed:{image:{url:imageToEmbed}}};
}

if (imageCollectionKeys.length != 0) {
	var imageCommand = commandBot.registerCommand("image", (msg, args) => {
		if(args.length != 1) {
			return "Invalid input";
		} else {
			for (i = 0; i < imageCollectionKeys.length; i++) {
				if (args[0].toLowerCase == imageCollectionKeys[i].toLowerCase) {
					return createEmbedImage(msg, randomImage(imageCollection[imageCollectionKeys[i]]));
				}
			}
			return "Invalid input";
		}
	},	{
		description: "Outputs an image from a configured list.",
		fullDescription: "The bot outputs an image based on the list of images provided by the bot owner attached to a given keyword. Use the argument \"list\" to see all options.",
		usage: "<image phrase>",
		caseInsensitive: true
	});
	
	imageCommand.registerSubcommand("list", (msg, args) => {
		if(args.length != 0) {return "Invalid input";}
		return "`"+imageCollectionKeys.join("`, `")+"`";
	}, {
		description: "List all valid image terms.",
		fullDescription: "Causes the bot to list all image terms.",
	});
};