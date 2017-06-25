commandBot.registerCommand("approxEqual", (msg, args) => {
    if(args.length != 3) {
        return "Invalid input";
    }
	var maxVal = args[1] + args[2];
	var minVal = args[1] - args[2];
	if(args[0] <= maxVal && args[0] >= minVal){
		return "true";
	} else {
		return "false";
	}
},	{
	description: "Spy's new dream",
	fullDescription: "Sees if a value is within another value",
	usage: "<x> <c> <v>",
	caseInsensitive: true
});