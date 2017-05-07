angular.module('LoginCtrl', [])
.controller('LoginController', function($scope, $rootScope, $location, dataService) {
	
	$scope.validateLogin = function(userIn, passIn){		
		dataService.performLoginOperation(userIn.$viewValue, passIn.$viewValue).then( function(body){
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				console.log(body.data.userInfo);
				$rootScope.isUserLoggedIn = true;
				sessionStorage.setItem('loggedIn', true);
				sessionStorage.setItem('userId', body.data.userInfo._id);
				toastr.success('Welcome to LaunchIt')
				$location.path('/');
			}else{
				$rootScope.isUserLoggedIn = false;
				toastr.error('Login credentials invalid.')
				console.log(body.data)
				//need to show error
				//clearfield
			}
		});
	};
	
	$scope.authenticate = function(platform){
		
		switch(platform){
			case 'facebook':
				console.log("FACEBOOK AUTHEN...");
				window.location.href = "/auth/facebook";
				break;			
			case 'twitter':
				console.log("TWITTER AUTHEN...");
				window.location.href = "/auth/twitter";
				break;
			case 'linkedin':
				console.log("LINKEDIN AUTHEN...");
				window.location.href = "/auth/linkedin";
				break;
			case 'google':
				console.log("GOOGLE AUTHEN...");
				window.location.href = "/auth/google";
				break;
			default:
				break;
		}
		
	}
})
.controller('RedirectionController', function($scope, $rootScope, $location, $routeParams, dataService) {
	
	$rootScope.isUserLoggedIn = true;
	sessionStorage.setItem('loggedIn', true);
	console.log($routeParams.id);
	sessionStorage.setItem('userId', $routeParams.id);
	$location.path('/');
})