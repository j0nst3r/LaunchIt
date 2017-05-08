var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{
		displayName: String,
		userBios: String,
		firstName: String,
		lastName: String,
		favLaunch: [String],
		following: [String],
		paypal: {}
	}
);