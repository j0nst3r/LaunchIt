var mongoose = require('mongoose');
module.exports = mongoose.Schema(
	{	
		email : String,
		socialId : String,
		password : String
	}
);
