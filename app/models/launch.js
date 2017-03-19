// grab the mongoose module
var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

//Defines our Launch schema
module.exports = mongoose.Schema( 
	{	
        name : String,
        tags : [String],
        promotion : Boolean,
        promotionDate : Date,
        comments : [String],
        website : String,
        description : String,
        voteYay : Number,
        voteNay : Number
	}
);
/*var LaunchSchema = new Schema({
    name : String,
    tags : [String],
    promotion : Boolean,
    promotionDate : Date,
    comments : [String],
    website : String,
    description : String,
    voteYay : Number,
    voteNay : Number
});*/
// define our Launch model
// module.exports allows us to pass this to other files when it is called
//module.exports = mongoose.model('Launch', LaunchSchema);
