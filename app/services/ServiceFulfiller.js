var service = {};

service.resultSet = []; 
service.connection = new Array(); //save connection socket


service.checkLoginCredential = checkLoginCredential;

service.validateEmail = validateEmail;
service.updateEmail = updateEmail;
service.validatePassword = validatePassword;
service.resetPassword = resetPassword;
service.createAccount = createAccount;
service.createProfile = createProfile;

service.getAllLaunches = getAllLaunches;
service.createLaunch = createLaunch;
service.deleteLaunch = deleteLaunch;
service.updateLaunchInfo = updateLaunchInfo;
service.updateComment = updateComment;

module.exports = service;

var mongoose = require('mongoose');
var db = mongoose.connection;

var userSchema = require('../models/user.js');
var user = mongoose.model('Users', userSchema);

var profileSchema = require('../models/profile.js');
var profile = mongoose.model('Profiles', profileSchema);

var launchSchema = require('../models/launch.js');
var launch = mongoose.model('Launches', launchSchema);


//===========================================
//ACCOUNT RELATED SERVICES.....
//===========================================
function checkLoginCredential(loginInfo){
	var data = JSON.stringify(loginInfo);
	console.log("IN CHECK LOGIN CREDENTIAL : " + data);
	//var user = mongoose.model('Users', userSchema);
	return user.findOne({email: loginInfo.email, password: loginInfo.password}, '_id premium',function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function createAccount(accountInfo){
	var newUser = new user({
		email : accountInfo.email,
		password : accountInfo.password
	});

	newUser.save(function(err, result){
		if(err) return console.error(err);
		return console.log(result);
	});

	return user.findOne({email: accountInfo.email},function(err, result){
		if(err) return console.error(err);
		return result;
	});
}

function validateEmail(userEmail){
	console.log("IN validateEmail : " + userEmail);
	return user.findOne(userEmail, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function updateEmail(data){
	console.log("IN updateEmail : " + data);
	var query = {_id: data._id};
	delete data._id;
	user.update(query, {$set: data}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}

function validatePassword(data){
	console.log("IN validatePassword : " + data);
	return user.findOne(data, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function resetPassword(data){
	console.log("IN updatePassword : " + data);
	var query = {_id: data._id};
	delete data._id;
	user.update(query, {$set: data}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}


//===========================================
//PROFILE RELATED SERVICES...................
//===========================================
function createProfile(reqData, userId){
	console.log("IN createProfile service: "  + reqData + "," + userId);
		var newProfile = new profile({
				_id : userId,
				displayName : reqData.displayName,
				firstName : reqData.firstName,
				lastName : reqData.lastName
			});
	return newProfile.save(function (err, result) {
		if (err) return console.error(err);
		return console.log(result);
	});
}

//==========================================
//LAUNCH RELATED SERVICES...................
//==========================================
function getAllLaunches() {
	console.log("In ServiceFulfiller: getAllLaunches");
	return launch.find({}, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}
function createLaunch(launchInfo){
	const tags = launchInfo.tags.split(",")
	var newLaunch = new launch({
		owner: launchInfo.owner,
		name: launchInfo.name,
		website : launchInfo.website,
		description : launchInfo.description,
		tags : tags
	})
	return newLaunch.save(function (err, result) {
		if(err) return console.error(err);
		return console.log(result);
	})
}

function updateLaunchInfo(launchInfo){
	var data = JSON.stringify(launchInfo);
	console.log("IN updateLaunchInfo: " + data);

	var query = {_id:launchInfo._id};
	delete launchInfo._id;
	delete launchInfo.owner;
	launch.update(query, {$set: launchInfo}, function(err, result){
		if(err) return console.error(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}

function deleteLaunch(launchInfo){
	var data = JSON.stringify(launchInfo);
	console.log("IN deleteLaunch: " + data);

	var query = {_id:launchInfo._id};
	delete launchInfo._id;
	delete launchInfo.owner;
	launch.remove(query, function(err, result){
		if(err) return console.error(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}




/*
//account related service

service.getAccount = getAccount;
service.checkSecurityAnswer = checkSecurityAnswer;
service.resetPassword = resetPassword;

//profile related service
service.createProfile = createProfile;
service.getProfileById = getProfileById;
service.getNameById = getNameById;
service.getProfileList = getProfileList;
service.updateProfileInfo = updateProfileInfo;
service.getBothConnections = getBothConnections;
service.getConnection = getConnection;
service.removeConnection = removeConnection;
service.getPendingConnection = getPendingConnection;
service.approveConnection = approveConnection;
service.declineConnection = declineConnection;
service.addConnection = addConnection;
service.performUserSearch = performUserSearch;
service.performProfileSearch = performProfileSearch;
 
//forum related service
service.getForumList = getForumList;
service.getForumById = getForumById;
service.createForumPost = createForumPost;
service.updateForum = updateForum;

//message related service 
service.publicMessage = publicMessage;
service.getAllUsers = getAllUsers;
service.getUsersByName = getUsersByName;
*/




/*
 CREATING USER ACCOUNT -> THEN CREATE PROFILE (REGISTRATION PROCESS)
var profileSchema = require('./app/models/Profile.js');
var personProfile = mongoose.model('Profile', profileSchema);

var userSchema = require('./app/models/User.js');
var user = mongoose.model('User', userSchema);
			
var createUser = new user({
				email : "admin",
				password : "password"
			});			
createUser.save(function (err, createUser) {
  if (err) 
	  return console.error(err);
  else
	  return console.log("INSERTED DATA INTO DB");
});

user.find({email: /admin/}, function(err, result){
	console.log(result);
	var createProfile = new personProfile({
				_id : result[0]._id,
				name : "admin",
				jobTitle : "admin",
				company : "net[Work]",
				summary : ".",
				education : ".",
				experience : [],
				skills : []
			});
	createProfile.save(function (err, createProfile) {
		if (err) 
			return console.error(err);
		else
			return console.log("INSERTED DATA INTO DB");			

	});
});

ABOVE ARE SAMPLES ON BASIC DB INSERTION, first get a document schema using predefine JSON in each model js file.
base on the schema, create an object and pass in the correct value for each field.
save the object into db







var forumSchema = require('../models/Forum.js');
var forum = mongoose.model('Forums', forumSchema);

var messageSchema = require('../models/Message.js');
var message = mongoose.model('Message', messageSchema);


//===========================================
//ACCOUNT RELATED SERVICES.....
//===========================================



function validateEmail(userEmail){
	console.log("IN validateEmail : " + userEmail);
	return user.findOne(userEmail, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function getAccount(accoutnInfo){
	console.log("IN getAccount : " + accoutnInfo);
	return user.findOne(accoutnInfo, 'sQuestion', function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function checkSecurityAnswer(accountInfo){
	return user.findOne({_id:accountInfo._id, sAnswer:accountInfo.sAnswer}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
}

function resetPassword(accountInfo){
	var data = JSON.stringify(accountInfo);
	console.log("IN resetPassword: " + data);

	var query = {_id:accountInfo._id, sAnswer:accountInfo.sAnswer};
	delete accountInfo._id;
	delete accountInfo.sAnswer;
	delete accountInfo.passwordConf;
	user.update(query, {$set: accountInfo}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}


//===========================================
//PROFILE RELATED SERVICES...................
//===========================================
function createProfile(reqData, userId){
	console.log("IN createProfile service: "  + reqData.name + "," + userId);
	//var profile = mongoose.model('Profiles', profileSchema);
	var newProfile = new profile({
				_id : userId,
				name : reqData.name,
				jobTitle : "",
				company : "",
				summary : "",
				education : [],
				experience : [],
				skills : []
			});
	return newProfile.save(function (err, result) {
		if (err) return console.error(err);
		return console.log(result);			
	});
}

function getProfileById(userId){
	console.log("IN getProfileById : " + userId);
	return profile.findById(userId, function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});
}

function getNameById(userId){
	console.log("IN getNameById : " + userId);
	return profile.findOne({_id: userId}, 'name', function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function getProfileList(userIds){
	console.log("IN getProfileList : " + userIds);
	return profile.find({_id: {$in:userIds}},'_id name jobTitle company', function(err, result){
		if(err) return console.error(err)
		console.log(result);
	});
}

function updateProfileInfo(basicProfile){
	var data = JSON.stringify(basicProfile);
	console.log("IN updateBasicProfile: " + data);

	var query = {_id:basicProfile.userId};
	delete basicProfile.userId;
	profile.update(query, {$set: basicProfile}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	return Promise.resolve({message:"OK"});
}

function getBothConnections(userId){
	console.log("IN getConnection : " + JSON.stringify(userId));
	return profile.findById(userId,'connections pendingConnections', function(err, result){
		if(err) return console.error(err);
		console.log(result.connections);
	});
}

function getConnection(userId){
	console.log("IN getConnection : " + JSON.stringify(userId));
	return profile.findById(userId,'connections', function(err, result){
		if(err) return console.error(err);
		console.log(result.connections);
	});
}

function removeConnection(userId, connectionList, connectionId){
	console.log("IN removeConnection : " + connectionList + " : " + connectionId);
	
	var query = { _id : userId}
	var newConnectionsList = connectionList.filter(function(element){
		return element != connectionId;
	});

	var newData = {connections : newConnectionsList};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});

	return Promise.resolve(newConnectionsList);
}
	

function getPendingConnection(userId){
	console.log("IN getPendingConnection : " + JSON.stringify(userId));
	var profile = mongoose.model('Profiles', profileSchema);
	return profile.findById(userId,'pendingConnections', function(err, result){
		if(err) return console.error(err);
		console.log(result);
	});
}

function approveConnection(userId, connectionLists, connectionId){
	console.log("IN approveConnection : " + connectionLists + " : " + connectionId);
	
	var connections = connectionLists.connections;
	var pendingConnections = connectionLists.pendingConnections;
	
	console.log("connections " + connections + ":: pendingConnections " + pendingConnections );
	
	var query = { _id : userId}
	
	var newPendingConnections = pendingConnections.filter(function(element){
		return element != connectionId;
	});
	
	connections.push(connectionId);

	var newData = {connections : connections, pendingConnections : newPendingConnections};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	return Promise.resolve(newPendingConnections);	
}

function declineConnection(userId, connectionList, connectionId){
	console.log("IN declineConnection : " + connectionList + " : " + connectionId);
	
	var query = { _id : userId}
	var newConnectionsList = connectionList.filter(function(element){
		return element != connectionId;
	});

	var newData = {pendingConnections : newConnectionsList};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});

	return Promise.resolve(newConnectionsList);
}

function addConnection(userId, pendingConnection, connectionId){
	console.log("IN addConnection..." + userId + " & " + connectionId);
	var pendingList = [];
	pendingConnection.forEach(function(element){
		pendingList.push(element);
	})
	pendingList.push(userId);
	
	var newData = {pendingConnections : pendingList};
	var query = {_id:connectionId};
	profile.update(query, {$set : newData}, function(err, result){
		if(err) return console.err(err);
		return console.log(result);
	});
	
	return Promise.resolve(pendingList);
}

function performUserSearch(searchInfo){
	return user.findOne({email: searchInfo.email},function(err, result){
		if(err) return console.error(err);
		console.log(result);
		return result;
	});
}

function performProfileSearch(searchInfo){
	var data = JSON.stringify(searchInfo);
	console.log("IN PERFORMPROFILESEARCH : " + data);
	
	var searchObj = {};
	Object.keys(searchInfo).forEach(function(key, index){
		if(searchInfo[key] !== ''){
			searchObj[key] = new RegExp(searchInfo[key], "ig");
		}
	}); //so far it only works for normal properties. skills and experience currently not working
	if(searchInfo.email != undefined){
		return user.findOne(searchObj, function(err, result){
			if(err) return console.error(err);
			console.log(result);
			return result;
		});
	}else{
		//search by standard values
		return profile.find(searchObj, '_id name company jobTitle skills education', function(err, result){
			if(err) return console.error(err);
			console.log(result);
			return result;
		});	
	}
	
}

//===========================================
//FORUM RELATED SERVICES.....................
//===========================================
function getForumList(ownerId){
	console.log("IN getForumList : requesting data from DB");
	var forum = mongoose.model('Forums', forumSchema);
	if(ownerId != undefined){
		return forum.find( {ownerId: ownerId}, '_id title ownerId forumOwnerName date description',function(err, result){
			if(err) return console.error(err);
			console.log(result);		
			return result;
		});	
	}else{
		return forum.find( {}, '_id title ownerId forumOwnerName date description',function(err, result){
			if(err) return console.error(err);
			console.log(result);		
			return result;
		});	
	}
}

function getForumById(forumId){
	console.log("IN getForumById : " + forumId);
	var forum = mongoose.model('Forums', forumSchema);
	return forum.findById(forumId, function(err, result){
		if(err) return console.error(err);
		console.log(result);		
		return result;
	});	
}

function createForumPost(forumData){
	console.log("IN createForumPost : " + forumData);
	
	//create the forum object`
	var createForum = new forum(forumData);
	
	//saving the forum object
	return createForum.save(function (err, createForum) {
		if (err) 
			return console.error(err);
		else
			return {message:"OK"};
	});
}
 */

function updateComment(reqData){
	console.log("IN ADD COMMENT..." + reqData)
	launch.findOne({_id:reqData._id}, function(err, result){
		console.log(result);
		if(err) return console.error(err);
		result.comments.push(reqData.newComment);
		launch.update({_id:reqData._id},{$set: result}, function(err, result){
			if(err) return console.error(err);
			console.log(result);
		})
	})
	return Promise.resolve({message:"ok"});
}

