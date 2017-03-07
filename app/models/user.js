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

/* COMMENTED OUT FOR NOW SINCE ITS CAUSING ERROR.
userSchema.methods.comparePassword = function(password) {
    var user = this;
    
    return bcrypt.compareSync(password, user.password);
};
*/

module.exports = mongoose.model('User', userSchema);
