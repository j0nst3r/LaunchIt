// grab the mongoose module
var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

//Defines our Launch schema
module.exports = mongoose.Schema( 
    {
        owner : mongoose.Schema.Types.ObjectId,
        name : String,
        tags : [String],
        promotion : Boolean,
        promotionDate : Date,
        comments : [String],
        website : [String],
        description : String,
        voteYay : [String],
        voteNay : [String]
	}
);
