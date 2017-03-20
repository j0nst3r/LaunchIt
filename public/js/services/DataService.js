angular.module('DataService', []).factory('dataService', ['$http', function($http, $q) {
	var urlBase = '';
	$http.get('application.properties').then(function(response){
		urlBase = response.data.apiUrl + "api";
	});
	$http.defaults.headers.post["Content-Type"] = 'application/JSON';
    var dataService = {};

    /*
      LOGIN SERVICE CALLS 
    */
	dataService.validateEmail = validateEmail;
	dataService.updateEmail = updateEmail;
	dataService.validatePassword = validatePassword;
	dataService.getAccount = getAccount;
	dataService.createAccount = createAccount;
	dataService.resetPassword = resetPassword;
	dataService.performLoginOperation = performLoginOperation;
	
	dataService.getAllLaunches = getAllLaunches;
	
	/*
	  LAUNCH SERVICE CALLS
	*/
	dataService.getLaunches = getLaunches;
	dataService.createLaunch = createLaunch;
	return dataService;	
	
	// get all of the launches in the database and return them
	function getAllLaunches(){
		return $http({
			method: 'GET',
			url: urlBase + '/getAllLaunches',
		}).then(
		    function(res) {
		    	console.log(JSON.stringify(res.data));
		    	return res.data;
		    },
		    function(res) {
		    	console.log(JSON.stringify(res.data));
		    	return $q.reject(res.data);
		    }
		)
	}

	function testForumService(){
		return $http({
				method: 'GET',
				url: urlBase + '/testForumService'
		}).then(
			function(res) { //what to on on success call
				console.log(JSON.stringify(res.data));
				return res.data;
			},
			function(res) { //what to do on failed call
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
		});
	}

	function getForumList(ownerId){
		var apiUrl;
		if(ownerId == undefined){
			apiUrl = urlBase + '/getForumList';
		}else{
			apiUrl = urlBase.concat('/getForumList/').concat(ownerId);
		}
		console.log(apiUrl);
				return $http({
				method: 'GET',
				url: apiUrl
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});

	}

	function getForumById(forumId){
		console.log(forumId);
		return $http({
				method: 'POST',
				url: urlBase + '/getForumById',
				data: forumId
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body.data;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}

	function validateEmail(newEmail){
		return $http({
			method: 'POST',
				url: urlBase + '/validateEmail',
				data: newEmail
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
	function validatePassword(data){
		return $http({
			method: 'POST',
				url: urlBase + '/validatePassword',
				data: data
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	function getLaunches(owner) {
		return $http({method: 'POST', url: urlBase + '/getLaunches', data: owner})
		.then(function (body) {
			console.log(body);
			return body;
		},
		function (res) {
			console.log(JSON.stringify(res.data));
			return $q.reject(res.data);
		});
	}
	function createLaunch(newLaunch){
		return $http({method: 'POST', url : urlBase + '/createLaunch', data: newLaunch})
		.then(function(body){
			console.log(body);
			return body;
		},
		function(res){
			console.log(JSON.stringify(res.data));
			return $q.reject(res.data);
		});
	}

	function getAccount(accountInfo) {
		return $http({
			method: 'POST',
				url: urlBase + '/getAccount',
				data: accountInfo
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
	function updateEmail(accountInfo){
		return $http({
			method: 'POST',
				url: urlBase + '/updateEmail',
				data: accountInfo
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
	function resetPassword(accountInfo){
		return $http({
			method: 'POST',
				url: urlBase + '/resetPassword',
				data: accountInfo
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}

	function createAccount(newUser){
		return $http({
				method: 'POST',
				url: urlBase + '/createAccount',
				data: newUser
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}

		
	function performLoginOperation(userIn, passIn){ 
		return $http({
				method: 'POST',
				url: urlBase + '/login',
				data: {email : userIn,
						password : passIn}
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
	function getProfile(profileID){ 
		console.log(profileID);
		return $http({
				method: 'POST',
				url: urlBase + '/getProfileById',
				data: profileID
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body.data;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
	
	function updateProfile(data){ 
		console.log(data);
		return $http({
				method: 'POST',
				url: urlBase + '/updateProfileInfo',
				data: data
		}).then(
			function(body) { //what to on on success call
				console.log(body);
				return body.data;
			},
			function(res){
				console.log(JSON.stringify(res.data));
				return $q.reject(res.data);
			});
	}
}]);