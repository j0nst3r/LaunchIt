// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines our profile schema
var profileSchema = new Schema({
    email: String, //used to reference actual user tied to this email
    launchpads: [], //if this doesn't work, try {type : Array, "default" : []} as it is more descriptive
    description: String
});
// define our profile model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Profile', ProfileSchema);
