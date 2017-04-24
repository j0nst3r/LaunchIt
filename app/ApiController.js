var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');
var pathExists = require('path-exists');
var mongoose = require('mongoose');

//===========================================
//IMAGE UPLOAD API.....
//===========================================
router.post('/uploadImage/:id', function(req, res) {
	console.log(req);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/launchImage/' + req.params.id + '/' + filename + '.png');
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

router.get('/launchImageFile/:id', function (req, res) {
	var profileDir = __dirname + '/launchImage/' + req.params.id + '/' + filename + '.png';
	var defaultDir = __dirname.concat('/launchImage/').concat('default').concat('.png');
	var path = require('path'); 

	if(pathExists.sync(profileDir)){
		res.sendfile(path.resolve(profileDir));
	}else{
		res.sendfile(path.resolve(defaultDir));
	}     
}); 


 
//===========================================
//LOGIN or REGISTRATION RELATED SERVICES.....
//===========================================
router.post('/login', function(req, res){
	console.log("login service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.checkLoginCredential(req.body).then(
		function(result){
			var data = {};
			console.log("in promise in apiController");
			if(result === null){
				console.log("no result");
				data.error = "Error. Login Failed";
				res.status(200).json(data);
			}
			data.message = "OK";
			data.userInfo = result;
			res.status(200).json(data);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/validateEmail', function(req, res){
	console.log("validateEmail service requested: " + JSON.stringify(req.body));
	serviceFulfiller.validateEmail(req.body).then( function(result){
		if(result === null){
			res.status(200).json({message:"OK"});
		}else{
			res.status(200).json({error: "Email already in use"});
		}
	});
});

router.post('/validatePassword', function(req, res){
	console.log("validatePassword service requested: " + JSON.stringify(req.body));
	serviceFulfiller.validatePassword(req.body).then( function(result){
		if(result !== null){
			res.status(200).json({message:"OK"});
		}else{
			res.status(200).json({error: "Failed"});
		}
	});
});

router.post('/updateEmail', function(req, res){
	console.log("updateEmail service requested: " + JSON.stringify(req.body));
	serviceFulfiller.updateEmail(req.body).then( function(result){
		if(result !== null){
			res.status(200).json({message:"OK"});
		}else{
			res.status(200).json({error: "Failed"});
		}
	});
});

router.post('/getAccount', function(req, res){
	console.log("validateEmail service requested: " + JSON.stringify(req.body));
	serviceFulfiller.getAccount(req.body).then( function(result){
		if(result !== null){
			res.status(200).json(result);
		}else{
			res.status(200).json({error: "Account Does Not Exist..."});
		}
	});
});

router.post('/resetPassword', function(req, res){
	console.log("resetPassword service requested: " + JSON.stringify(req.body));
	serviceFulfiller.resetPassword(req.body).then( function(result){
		res.status(200).json(result);
	});
});

router.post('/createAccount', function(req, res){
	console.log("createAccount service requested: " + JSON.stringify(req.body));
	serviceFulfiller.createAccount(req.body).then( function(accountResult){ 
		// finished with creatingAccount, will need to createProfile
		serviceFulfiller.createProfile(req.body, accountResult._id).then(function(profileResult){
			res.status(200).json({message:"OK"});
			})
		})
});

//===========================================
//LAUNCH RELATED SERVICES.....
//===========================================
router.get('/getAllLaunches', function(req, res) {
	console.log("getAllLaunches service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getAllLaunches().then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/getLaunches', function (req, res) {
	console.log("getLaunches service requested: " + JSON.stringify(req.body));
	serviceFulfiller.getLaunches(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
	});
})

router.post('/castVote', function(req, res){
	console.log("user casting vote..." + JSON.stringify(req.body));
	serviceFulfiller.getLaunchById(req.body.launchId).then(
		function(result){
			serviceFulfiller.castVote(result, req.body).then(
			function(result){
				res.status(200).json(result);
			},
			function(result){
				console.log(JSON.stringify(result));
			});
		},
		function(result){
			console.log(JSON.stringify(result));
	});
})

router.post('/addToFavorite', function (req, res) {
	console.log("addToFavorite service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfiles(req.body).then(
	function(result){
		console.log("got result back....")
		serviceFulfiller.addToFavorite(result.favLaunch, req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	},
	function(result){
		console.log(JSON.stringify(result));
		res.status(200).JSON(result);
	});
})

router.post('/removeFromFavorite', function (req, res) {
	console.log("addToFavorite service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		console.log("got result back....")
		serviceFulfiller.removeFromFavorite(result.favLaunch, req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	},
	function(result){
		console.log(JSON.stringify(result));
		res.status(200).JSON(result);
	});
})

router.post('/addToFollowing', function (req, res) {
	console.log("addToFollowing service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		console.log("got result back...." + result)
		serviceFulfiller.addToFollowing(result.following, req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	},
	function(result){
		console.log(JSON.stringify(result));
		res.status(200).JSON(result);
	});
})

router.post('/removeFromFollowing', function (req, res) {
	console.log("removeFromFollowing service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		serviceFulfiller.removeFromFollowing(result.following, req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	},
	function(result){
		console.log(JSON.stringify(result));
		res.status(200).JSON(result);
	});
})

router.post('/getFavoriteLaunches', function (req, res) {
	console.log("getLaunches service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		//get the lauches from the list
		serviceFulfiller.getLaunchesById(result.favLaunch).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	},
	function(result){
		console.log(JSON.stringify(result));
		res.status(200).JSON(result);
	});
})

router.post('/getFollowLaunches', function (req, res) {
	console.log("getFollowLaunches service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		//get the lauches from the list
		console.log(result.following)
		serviceFulfiller.getLaunchesByOwnerId(result.following).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
	},
	function(result){
		console.log(JSON.stringify(result));
		res.status(200).JSON(result);
	});
})


router.post('/createLaunch', function(req, res) {
	console.log("createlaunch service requested: " + JSON.stringify(req.body));
	serviceFulfiller.createLaunch(req.body);
})

router.post('/updateLaunchInfo', function(req, res){
	console.log("updateLaunchInfo service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.updateLaunchInfo(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/deleteLaunch', function(req, res){
	console.log("updateLaunchInfo service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.deleteLaunch(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});
 
//===========================================
//PROFILE RELATED SERVICES.....
//===========================================
router.post('/getProfileById', function(req, res){
	console.log("getProfileById service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.getProfileById(req.body.userId).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/updateProfileInfo', function(req, res){
	console.log("updateProfileInfo service requested : " + JSON.stringify(req.body));
	
	serviceFulfiller.updateProfileInfo(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});




module.exports = router;
 


