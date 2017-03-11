module.exports = function(app) {
	
	// server routes ===========================================================
	
	// frontend routes =========================================================
	// route to handle all angular requests	
	//if looking for application.properties
	app.get('/application.properties', function(req, res) {
		res.sendfile('./application.properties');
	});
	
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};