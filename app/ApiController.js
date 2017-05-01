var express = require('express');
var path = require('path');
var fs = require('fs');
var fsExtra = require('fs-extra');
var router = express.Router();
var serviceFulfiller = require('./services/ServiceFulfiller');
var pathExists = require('path-exists');
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({dest:'app/tempImg/'})

//===========================================
//IMAGE UPLOAD API.....
//===========================================
router.post('/uploadProfileImage/:id', function(req, res) {
	console.log(req);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/profileImage/' + req.params.id + '.png');
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

router.get('/userImage/:id', function (req, res) {
	var profileDir = __dirname.concat('/profileImage/').concat(req.params.id).concat('.png');
	var defaultDir = __dirname.concat('/profileImage/').concat('default').concat('.png');
	var path = require('path'); 

	if(pathExists.sync(profileDir)){
		res.sendfile(path.resolve(profileDir));
	}else{
		res.sendfile(path.resolve(defaultDir));
	} 
}); 

router.get('/launchImage/:launchID/:imageName', function (req, res) {
	var targetDir = __dirname.concat('/launchImage/').concat(req.params.launchID).concat('/').concat(req.params.imageName);
	var defaultDir = __dirname.concat('/launchImage/').concat('LaunchDefault.png')
	var path = require('path'); 
	console.log(targetDir);
	if(pathExists.sync(targetDir)){
		res.sendfile(path.resolve(targetDir));
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

router.get('/getDisplayName/:id', function(req, res, next){
	var userId = req.params.id;
	console.log("getDisplayName service requested...");
	serviceFulfiller.getDisplayName(userId).then(
		function(result){
			res.status(200).json(result);
		},
		function(err){
			if(err) console.error(err);
			res.status(500).json(err);
		});
})

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

router.post('/addToFavorites', function (req, res) {
	console.log("addToFavorites service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		console.log("got result back....");
		serviceFulfiller.addToFavorites(result.favLaunch, req.body).then(
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

router.post('/removeFromFavorites', function (req, res) {
	console.log("removeFromFavorite service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		console.log("REMOVING FROM FAVORITES: ApiController ***********************************************************************************")
		serviceFulfiller.removeFromFavorites(result.favLaunch, req.body).then(
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
	console.log("getFavoriteLaunches service requested: " + JSON.stringify(req.body));
	
	//get favLaunch from profile
	serviceFulfiller.getProfile(req.body).then(
	function(result){
		//get the lauches from the list
		console.log("get launches by ID");
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


router.post('/createLaunch', upload.array('file'), function(req, res, next) {
	var fileList = req.files
	var data = JSON.parse(req.body.body)
	var updatedList;
	console.log(data);
	console.log(fileList);
	
	var launchObj = JSON.parse(req.body.body)
	var websiteList = [];
	websiteList.push(launchObj.website);
	launchObj.website = websiteList;
	console.log(launchObj);
	serviceFulfiller.createLaunch(launchObj).then(
		function(createResult){	
			console.log("RESULT...." + createResult)
			//for each file in the file list, store image to correct folder and 
			for(var a = 0; a < fileList.length; a++){
				var tempDir = __dirname.concat('/tempImg/').concat(fileList[a].filename);
				var permaDir = __dirname.concat('/launchImage/').concat(result._id).concat('/');
				fsExtra.move(tempDir, permaDir.concat(fileList[a].originalname), function(err) {
				if (err) return console.error(err)
					console.log("file uploaded!")
				});
				var imgSrc = 'http://'.concat(baseUrl).concat('/api/launchImage/').concat(result._id).concat('/').concat(fileList[a].originalname);
				createResult.website.push(imgSrc);
			}
			serviceFulfiller.updateLaunchInfo(createResult).then(
			function(result){
				res.status(200).json(result);
			},
			function(result){
				console.log(JSON.stringify(result));
			});
		},function(err){
			console.err(err);
	});
})

router.post('/updateLaunchInfo', upload.array('file'), function(req, res, next) {
	var fileList = req.files
	var data = JSON.parse(req.body.body)
	var updatedList;
	console.log(data);
	console.log(fileList);
	console.log("updateLaunchInfo service requested : ", data, fileList);

	//wipe directory of old picture and clear imageList
	data.website = [];
	var permaDir = __dirname.concat('/launchImage/').concat(data._id).concat('/');
	fsExtra.remove(permaDir)
		.then(() => {
			//move new picture into folder
			for(var a = 0; a < fileList.length; a++){
				var tempDir = __dirname.concat('/tempImg/').concat(fileList[a].filename);
				var permaDir = __dirname.concat('/launchImage/').concat(data._id).concat('/');
				fsExtra.move(tempDir, permaDir.concat(fileList[a].originalname), function(err) {
				if (err) return console.error(err)
					console.log("file uploaded!")
				});
				//building new img source links
				var imgSrc = 'http://'.concat(baseUrl).concat('/api/launchImage/').concat(result._id).concat('/').concat(fileList[a].originalname);
				data.website.push(imgSrc);
			}
			serviceFulfiller.updateLaunchInfo().then(
			function(result){
				res.status(200).json(result);
			},
			function(result){
				console.log(JSON.stringify(result));
			});
		})
		.catch(err => {
			console.error(err);
		})



	//updateLaunchInfo

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
	
	
	fsExtra.remove(__dirname.concat('/launchImage/').concat(req.body._id), function () { console.log('done'); });

	serviceFulfiller.deleteLaunch(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
		});
});

router.post('/addComment', function (req, res) {
	console.log("addComment service requested: " + JSON.stringify(req.body));
	serviceFulfiller.addComment(req.body).then(
		function(result){
			res.status(200).json(result);
		},
		function(result){
			console.log(JSON.stringify(result));
	});
})

 
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
 


