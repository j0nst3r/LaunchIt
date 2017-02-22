// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines our launchpad schema
var launchpadSchema = new Schema({
    launches : [{launch_id: ObjectId}],
    description : String
});
// define our launchpad model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Launchpad', launchpadSchema);
