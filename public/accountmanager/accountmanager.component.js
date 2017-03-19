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
			$scope.$passwordFailed = true;
			
			$scope.validatePasswordConfirmation = function(pass, passConf){
				return (pass.$viewValue !== passConf.$viewValue);
			};
	
			$scope.validateEmail = function(newEmail){
				console.log("attempting to validate email..." + newEmail.$viewValue);
				if(newEmail.$viewValue == undefined || newEmail.$viewValue == ''){
					$scope.emailFailed = true;
				}else{
					dataService.validateEmail({email: newEmail.$viewValue}).then(function(body){
						if(body.data.message !== undefined && body.data.message === "OK"){
							$scope.emailFailed = false;
						}else{
							$scope.emailCheckerResult = body.data.error;
							$scope.emailFailed = true;
						}
					});
				}
			}
			
			$scope.validatePassword = function(oldPassword){
				console.log("attempting to validate email..." + oldPassword.$viewValue);
				if(oldPassword.$viewValue == undefined || oldPassword.$viewValue == ''){
					$scope.passwordFailed = true;
				}else{
					dataService.validatePassword({_id:sessionStorage.getItem("userId"), password: oldPassword.$viewValue}).then(function(body){
						if(body.data.message !== undefined && body.data.message === "OK"){
							$scope.passwordFailed = false;
						}else{
							$scope.passwordFailed = true;
						}
					});
				}
			}
			
			$scope.checkNewEmailForm = function(){
				return ($scope.emailFailed || $scope.passwordFailed);
			}

			$scope.updateEmailModal = function(){
				$scope.modalHeader = 'Updating Email'
				$scope.editBody = "";
				editField = 'email'
			};
			
			$scope.updatePasswordModal = function(){
				$scope.$passwordFailed = true;
				$scope.modalHeader = 'Change Password'
				$scope.editBody = "";
				editField = 'password'
			};	
			
			$scope.updatePaypalModal = function(){
				$scope.modalHeader = 'Payment Method'
				$scope.editBody = "";
				editField = 'payment'
			};	
			
			$scope.disableAccountModal = function(){
				$scope.modalHeader = 'Disable Account'
				$scope.editBody = "";
				editField = 'disableAccount'
			};	
			
			$scope.deleteAccountModal = function(){
				$scope.modalHeader = 'Delete Account'
				$scope.editBody = "";
				editField = 'deleteAccount'
			};	
			
			$scope.update = function(data){
				//create the correct JSON for service call
				var dataToSubmit = {};
				
				switch(editField){
					case 'email':
						dataToSubmit._id = sessionStorage.getItem('userId');
						dataToSubmit.email = data.email.$viewValue;
						console.log("updating email...");	
						dataService.updateEmail(dataToSubmit);
						break;
					case 'password':
						dataToSubmit._id = sessionStorage.getItem('userId');
						dataToSubmit.password = data.newPassword.$viewValue;
						console.log("updating password...");
						dataService.resetPassword(dataToSubmit);
						break;
					default:
						console.log("not supported...");	
						break;	
				}
			};	
		}
	});