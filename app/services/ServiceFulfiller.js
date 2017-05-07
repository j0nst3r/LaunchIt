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
service.addToFavorites = addToFavorites;
service.removeFromFavorites = removeFromFavorites;
service.addToFollowing = addToFollowing;
service.removeFromFollowing = removeFromFollowing;
service.getProfile = getProfile;
service.updateProfileInfo = updateProfileInfo;
service.getDisplayName = getDisplayName;
service.getFollowerProfile = getFollowerInfo


service.getAllLaunches = getAllLaunches;
service.getLaunchesById = getLaunchesById;
service.getLaunchById = getLaunchById;
service.getLaunchesByOwnerId = getLaunchesByOwnerId;
service.getLaunches = getLaunches;
service.createLaunch = createLaunch;
service.deleteLaunch = deleteLaunch;
service.updateLaunchInfo = updateLaunchInfo;
service.castVote = castVote;
service.uncastVote = uncastVote;
service.addComment = addComment;


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

    return Promise.resolve(newUser._id);
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

function getDisplayName(userId){
	console.log("IN getDisplayName service: " + userId);
	return profile.findOne({_id:userId}, 'displayName', function (err, result) {
		if (err) return console.error(err);
		return console.log(result);			
	});
}

function addToFavorites(favList, reqData){
    console.log("In ServiceFulfiller addToFavorites: " + JSON.stringify(reqData));
    var query = {_id: reqData.userId};

    if (favList.indexOf(reqData.launchId) === -1) {
        favList.push(reqData.launchId);
    }

    profile.update(query, {$set: {favLaunch: favList}}, function(err, result){
        if(err) return console.err(err);
        return console.log(result);
    });
    return Promise.resolve({message:"OK"});
}

function removeFromFavorites(favList, reqData){
    console.log("IN removeFromFavorites: " + JSON.stringify(reqData));
    var query = {_id: reqData.userId};

    newList = favList.filter(function(data){
        return (data != reqData.launchId);
    })

    profile.update(query, {$set: {favLaunch: newList}}, function(err, result){
        if(err) return console.err(err);
        return console.log(result);
    });
    return Promise.resolve({message:"OK"});
}

function addToFollowing(favList, reqData){
    console.log("IN addToFollowing: " + JSON.stringify(reqData));
    var query = {_id: reqData.userId};

    if (favList.indexOf(reqData.launchId) === -1) {
        favList.push(reqData.followId);
    }

    profile.update(query, {$set: {following: favList}}, function(err, result){
        if(err) return console.err(err);
        return console.log(result);
    });
    return Promise.resolve({message:"OK"});
}

function removeFromFollowing(favList, reqData){
    console.log("IN removeFromFavorite: " + JSON.stringify(reqData));
    var query = {_id: reqData.userId};

    newList = favList.filter(function(data){
        return (data != reqData.followId);
    })

    profile.update(query, {$set: {following: newList}}, function(err, result){
        if(err) return console.err(err);
        return console.log(result);
    });
    return Promise.resolve({message:"OK"});
}

function getProfile(reqData){
    console.log("IN getUserProfile: " + JSON.stringify(reqData));
    return profile.findOne({_id:reqData.userId}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    });
}

function getFollowerInfo(reqData){
    console.log("IN getUserProfile: " + JSON.stringify(reqData));
    return profile.find({ _id : { $in : reqData }}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
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
//==========================================
//LAUNCH RELATED SERVICES...................
//==========================================
function getAllLaunches() {
    console.log("In ServiceFulfiller: getAllLaunches");
    var temp = launch.find({}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    });
    return Promise.resolve(temp);
}

function getLaunchesById(launchIdList){
    console.log("In ServiceFulfiller: getLaunchById " + launchIdList);
    return launch.find({_id:{"$in": launchIdList}}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    });
}

function getLaunchesByOwnerId(followingIdList){
    console.log("In ServiceFulfiller: getLaunchesByOwnerId " + followingIdList);
    return launch.find({owner:{"$in": followingIdList}}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    });
}

function getLaunchById(launchId){
    return launch.findOne({_id:launchId}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    });
}

function getLaunches(ownerId){
    console.log("In ServiceFulfiller: getLaunches");
    return launch.find(ownerId, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    });
}



function createLaunch(launchInfo){
    console.log("IN createLaunch: " + launchInfo);
    // var tags = []
    // if(launchInfo.tags !=null) {
    //     tags = launchInfo.tags.split(",")
    // }
    // console.log("PLEASE HELP: " + JSON.stringify(tags))
    var newLaunch = new launch({
        owner: launchInfo.owner,
        name: launchInfo.name,
        website : launchInfo.website,
        description : launchInfo.description,
        tags : launchInfo.tags
    })

    newLaunch.save(function (err, result) {
        if(err) return console.error(err);
        return console.log(result);
    })

    return Promise.resolve(newLaunch._id);
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

function castVote(result, ballot){
    //clears the list of the old vote
    console.log(result);
    var newNayList = result.voteNay.filter(function(data){
        return (data != ballot.userId);
    })
    var newYayList = result.voteYay.filter(function(data){
        return (data != ballot.userId);
    })
    switch(ballot.type){
        case "down":
            newNayList.push(ballot.userId);
            break;
        case "up":
            newYayList.push(ballot.userId);
            break;
        default:
            console.log("STOP TRYING TO BREAK API...")
            return;
    }

    result.voteNay = newNayList;
    result.voteYay = newYayList;

    console.log(result);

    launch.findOneAndUpdate({_id:ballot.launchId},{$set: result}, {new: true}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    })
    return Promise.resolve(result);
}

function uncastVote(result, ballot){
    //clears the list of the old vote
    console.log(result);
    var newNayList = result.voteNay.filter(function(data){
        return (data != ballot.userId);
    })
    var newYayList = result.voteYay.filter(function(data){
        return (data != ballot.userId);
    })
    switch(ballot.type){
        case "down":
            newNayList.remove(ballot.userId);
            break;
        case "up":
            newYayList.remove(ballot.userId);
            break;
        default:
            console.log("STOP TRYING TO BREAK API...")
            return;
    }

    result.voteNay = newNayList;
    result.voteYay = newYayList;

    console.log(result);

    launch.findOneAndUpdate({_id:ballot.launchId},{$set: result}, {new: true}, function(err, result){
        if(err) return console.error(err);
        console.log(result);
        return result;
    })
    return Promise.resolve(result);
}

function addComment(reqData){
    console.log("IN ADD COMMENT..." + reqData)
    launch.findOne({_id:reqData.launchId}, function(err, result){
        console.log(result);
        if(err) return console.error(err);
        result.comments.push(reqData.newComment);
        launch.update({_id:reqData.launchId},{$set: result}, function(err, result){
            if(err) return console.error(err);
            console.log(result);
        })
    })
    return Promise.resolve({message:"ok"});
}