var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
	res.render('register');
});

router.post('/', function (req, res) {
	// register using API
	request.post({
		url: config.apiUrl + '/users/register',
		form: req.body,
		json: true
	}, function (error, response, body) {
		if (error) {
			return res.render('register', { error: 'An error occurred' });
		}
		
		if (response.statusCode !== 200) {
			return res.render('register', {
				error: response.body,
				firstname: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				passHash: req.body.password
			});
		}
		
		// return to login page with success message
		req.session.success = 'Registration successful';
		return res.redirect('/login');
	});
});




//===========================================
//LOGIN RELATED SERVICES.....
//===========================================


router.post('/login', function(req, res) {
	//find User
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({
			success: false,
			message: 'Authentication failed. User not found.'
			});
		} else if (user) {
			// check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			} else {
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, superSecret, {
					expiresInMinutes: 2880 // expires 2 days
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}

	});
});






module.exports = router;
