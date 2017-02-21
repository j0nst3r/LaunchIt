// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines our user schema
var userSchema = new Schema({
    email: String,
    username: String,
    firstName: String,
    lastName: String,
    passHash: String,
    passSalt: String //if we use a salt, which we should
});
// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);
