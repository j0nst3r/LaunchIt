angular.module('MainCtrl', []).controller('MainController', function($scope, $rootScope, $location, dataService) {	

	$rootScope.isUserLoggedIn = (sessionStorage.getItem('loggedIn') == 'true');

	this.logout = function(){
		sessionStorage.setItem('loggedIn', false);
		$location.path('/');
	}
	
	this.loadRegistration = function(){
		$location.path('/registration');
	}
	
	this.goHome = function(){
		if($rootScope.isUserLoggedIn){
			$location.path('/');
		}
	}
});