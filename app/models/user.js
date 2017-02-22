// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines our user schema
var userSchema = new Schema({
    email: String,
    passHash: String,
    passSalt: String //if we use a salt, which we should
});
// define our user model, used for login purposes
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);
