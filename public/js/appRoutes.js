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
			templateUrl: 'views/registration.html',
			controller: 'RegistrationController'	
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
			template: '<launch-board></launch-board>'
		});
		
		
		

	$locationProvider.html5Mode(true);

}]);