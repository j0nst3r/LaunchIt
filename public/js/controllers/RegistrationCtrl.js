angular.module('RegistrationCtrl', [])

.controller('RegistrationController', function($scope, $rootScope, $location, dataService) {
	
	$scope.emailCheckerResult = '';
	$scope.emailFailed = true;
	
	$scope.createUserAccount = function(user){
		var newUser = user;
		newUser.displayName = user.firstName + " " + user.lastName;
		dataService.createAccount(newUser).then(function(body){
			console.log(JSON.stringify(body.data));
			if(body.data.message !== undefined && body.data.message === "OK"){
				$location.path('/'); // path not hash
			}else{
				
			}
		})
		
		console.log(newUser);
	};
	
	$scope.validatePasswordConfirmation = function(pass, passConf){
		return (pass.$viewValue !== passConf.$viewValue);
	};
	
	$scope.resetChecker = function(){
		$scope.emailCheckerResult = '';
		$scope.emailFailed = true;
		$scope.mailChecker = '';
	};
	
	$scope.validateEmail = function(newEmail){
		console.log("attempting to validate email..." + newEmail.$viewValue);
		if(newEmail.$viewValue == undefined || newEmail.$viewValue == ''){
			$scope.emailCheckerResult = "Email cannot be blank."
			$scope.emailFailed = true;
		}else{
			dataService.validateEmail({email: newEmail.$viewValue}).then(function(body){
				if(body.data.message !== undefined && body.data.message === "OK"){
					$scope.emailCheckerResult = "email can be used.";
					$scope.emailFailed = false;
					$scope.mailChecker = 'pass';
				}else{
					$scope.emailCheckerResult = body.data.error;
					$scope.emailFailed = true;
				}
			});
		}
	}
});