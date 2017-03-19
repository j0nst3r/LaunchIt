"use strict"

angular
	.module('accountpage')
	.component('accountmanager', {
		templateUrl: 'accountmanager/accountmanager.template.html',
		controller : function($uibModal, $scope, $rootScope, dataService) {
			
			$scope.modalHeader = '';
			$scope.editBody = '';
			var editField = '';
			$scope.$emailFailed = true;
			
			$scope.validatePasswordConfirmation = function(pass, passConf){
				return (pass.$viewValue !== passConf.$viewValue);
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
						}else{
							$scope.emailCheckerResult = body.data.error;
							$scope.emailFailed = true;
						}
					});
				}
			}
			

			$scope.updateEmailModal = function(){
				var temp = {email: "", password: ""};
				$scope.modalHeader = 'Updating Email'
				$scope.editBody = temp;
				editField = 'email'
			};	
			
			$scope.updateEmail = function(newEmail){
				//create the correct JSON for service call
				//dataService.updateEmail([JSON]);
				console.log("updating email...");
			};	
		}
	});