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
	
	return dataService;	
	
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
	
	function getAccount(accountInfo){
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