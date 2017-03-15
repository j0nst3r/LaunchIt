angular.module('MainCtrl', []).controller('MainController', function($rootScope, $location, dataService) {	

	$rootScope.isUserLoggedIn = (sessionStorage.getItem('loggedIn') == 'true');

	this.logout = function(){
		sessionStorage.setItem('loggedIn', false);
		$rootScope.isUserLoggedIn = false;
		$location.path('/');
	}
	
	this.loadRegistration = function(){
		$location.path('/registration');
	}
	
	this.goHome = function(){
		$location.path('/');
	}
});