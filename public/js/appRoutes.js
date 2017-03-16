angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/login',{
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
  
		.when('/registration', {
			template: '<registrationform></registrationform>'
		})
		
		.when('/notification', {
			templateUrl: 'views/notification.html',
			controller: 'NotificationController'	
		})
		
		.when('/account', {
			templateUrl: 'views/account.html',
			controller: 'AccountController'	
		})
		
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'	
		})
		
		.when('/launches', {
			templateUrl: 'views/launches.html',
			controller: 'LaunchesController'
		})
		
		.when('/launch-board', {
			template: '<launch-board></launch-board>'
		})
		.when('/launch-board-private', {
			template: '<launch-board is-private=true></launch-board>'
		});
		
	$locationProvider.html5Mode(true);

}]);