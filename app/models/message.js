// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defines our message schema
var messageSchema = new Schema({
    //Are these IMs or more inbox-like messages?
    senderName : String,
    receiverName : String,
    message : String,
    timestamp : {type : Date, default : Date.now}
});
// define our message model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Message', messageSchema);
