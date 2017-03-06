// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines our profile schema
var profileSchema = new Schema({
    user_id: ObjectId, //alternatively, to make it more NoSQL-like we can have the whole profile be a sub-doc of user
    username: String,
    firstName: String,
    lastName: String,
    launchpads: [{launchpad_id: ObjectId}], //if this doesn't work, try {type : Array, "default" : []} as it is more descriptive
    description: String
});
// define our profile model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Profile', ProfileSchema);
