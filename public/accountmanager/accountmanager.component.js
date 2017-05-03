"use strict"

angular
    .module('accountpage')
    .component('accountmanager', {
        templateUrl: 'accountmanager/accountmanager.template.html',
        controller : function($location, $route, $uibModal, $scope, $rootScope, dataService) {
            
            var visitorId = $route.current.params.id
            $scope.isPrivate =  visitorId == undefined
            
            

            /*$scope.userData = 
            {
                displayName : "ClubSoda",
                firstName: "Jon",
                lastName: "Chen",
                userBios: "4th Year Software Engineer. #LazyPotatoe",
                following: ["test"]
            };*/


            $scope.modalHeader = '';
            $scope.editBody = '';
            $scope.editField = $scope.showTabIndex='updateEmail';
            $scope.emailFailed = true;
            $scope.passwordFailed = true;

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




            $scope.update = function(data){
                //create the correct JSON for service call
                var dataToSubmit = {};

                switch($scope.showTabIndex){
                    case 'updateEmail':
                        dataToSubmit._id = sessionStorage.getItem('userId');
                        dataToSubmit.email = data.email.$viewValue;
                        console.log("updating email...");
                        dataService.updateEmail(dataToSubmit);
                        $scope.showTabIndex = 'default';
                        break;
                    case 'changePassword':
                        dataToSubmit._id = sessionStorage.getItem('userId');
                        dataToSubmit.password = data.newPassword.$viewValue;
                        console.log("updating password...");
                        dataService.resetPassword(dataToSubmit);
                        $scope.showTabIndex = 'default';
                        break;
                    case 'profile':
                        var params = {
                            "userId" : $scope.curUser,
                            "displayName" : $scope.user.displayName,
                            "firstName": $scope.user.firstName,
                            "lastName": $scope.user.lastName,
                            "userBios": $scope.user.userBios
                        }
                        console.log(params);
                        dataService.updateProfile(params).then(function(data){});
                        $scope.showTabIndex = 'default';
                        break;  
                    default:
                        console.log("not supported...");
                        break;
                }
            };

            $scope.showTabIndex = 'default';

            $scope.curUser = sessionStorage.getItem('userId');
            $scope.imgURL = 'http://localhost:8080/api/userImage/' + $scope.curUser;
            
            dataService.getProfile({'userId': $scope.curUser}).then(function(data){
                $scope.userData = data;
                $scope.isFollowing = $scope.userData.following.indexOf(visitorId) !== -1;
                $scope.user = $scope.userData;
            });
            
            


            $scope.switchTab=function(index){
                if($scope.showTabIndex!=index){
                    $scope.showTabIndex=index;
                }
                if(index == 'viewFollowing'){
                    dataService.getFollowerInfo($scope.follower)
                }
            };

            $scope.toggleFollow = function(){
                console.log($scope.isFollowing);
                $scope.isFollowing = !$scope.isFollowing;
            }

            $scope.goToUserBoard = function(){
                $location.path('/launch-board/' + $route.current.params.id);
            }
        }
    })
    .directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    })
