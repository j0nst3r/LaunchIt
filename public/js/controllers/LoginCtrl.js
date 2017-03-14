angular.module('LoginCtrl', []).controller('LoginController', function($scope, $rootScope, $location, dataService) {
	
	$scope.validateLogin = function(userIn, passIn){		
		dataService.performLoginOperation(userIn.$viewValue, passIn.$viewValue).then( function(body){
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				console.log(body.data.userInfo);
				$scope.isUserLoggedIn = true;
				$scope.userId = body.data.userInfo._id;
				sessionStorage.setItem('loggedIn', true);
				sessionStorage.setItem('userId', body.data.userInfo._id);
				$location.path('/'); // path not hash
			}else{
				$rootScope.isUserLoggedIn = false;
				toastr.error('Login credentials invalid.')
				console.log(body.data)
				//need to show error
				//clearfield
			}
		});
	};
})