var mongoose = require('mongoose');

module.exports = mongoose.Schema( 
	{
		displayName: String,
		firstName: String,
		lastName: String
	}
);