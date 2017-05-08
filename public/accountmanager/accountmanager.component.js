"use strict"

angular
    .module('accountpage')
    .component('accountmanager', {
        templateUrl: 'accountmanager/accountmanager.template.html',
        controller : function($sce, $location, $route, $uibModal, $scope, $rootScope, dataService) {
            
            $scope.userId = ($route.current.params.id === undefined ? sessionStorage.getItem('userId') : $route.current.params.id)
            console.log($scope.userId);

            $scope.authenticate = function(){
                window.location.href = '/auth/paypal?Access_token=rgthz9mqx2jfbp23$c77d0a8b075b18bcec70a7c0870ba41c';
            }

            $scope.isPrivate =  $route.current.params.id === undefined
            dataService.getProfile({'userId': $scope.userId}).then(function(data){
                $scope.userData = data;
                $scope.user = $scope.userData;
                $scope.userData.paypal.content = $sce.trustAsHtml($scope.userData.paypal.content);
            });

            dataService.getFollowingStatus({"loggedInUser": sessionStorage.getItem('userId'), "publicUser":$scope.userId}).then(
                function(result){
                    $scope.isFollowing = result.status;
                    console.log($scope.isFollowing);
                })
            
            

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
                        dataToSubmit._id = $scope.userId;
                        dataToSubmit.email = data.email.$viewValue;
                        console.log("updating email...");
                        dataService.updateEmail(dataToSubmit);
                        $scope.showTabIndex = 'default';
                        break;
                    case 'changePassword':
                        dataToSubmit._id = $scope.userId;
                        dataToSubmit.password = data.newPassword.$viewValue;
                        console.log("updating password...");
                        dataService.resetPassword(dataToSubmit);
                        $scope.showTabIndex = 'default';
                        break;
                    case 'profile':
                        var params = {
                            "userId" : $scope.userId,
                            "displayName" : $scope.user.displayName,
                            "firstName": $scope.user.firstName,
                            "lastName": $scope.user.lastName,
                            "userBios": $scope.user.userBios
                        }
                        console.log(params);
                        dataService.updateProfile(params).then(function(data){});
                        $scope.showTabIndex = 'default';
                        break;
                    case 'linkPaypal':
                        var params = {
                            "userId" : $scope.userId,
                            "paypal" : data
                        }
                        params.paypal.content = params.paypal.content.replace(/\n/ig, '');
                        console.log(data);
                        dataService.updateProfile(params);
                        $scope.showTabIndex = 'default';
                    break;
                    default:
                        console.log("not supported...");
                        break;
                }
            };

            $scope.showTabIndex = 'default';


            $scope.imgUrl = dataService.getImageUrl($scope.userId);

            $scope.switchTab=function(index){
                if($scope.showTabIndex!=index){
                    $scope.showTabIndex=index;
                }
                if(index == 'viewFollowing'){
                    //get the list of followers to render on UI
                    dataService.getFollowerInfo($scope.userData.following).then(function(result){
                        $scope.followerInfo = angular.copy(result);
                        $scope.followerInfo.forEach(function(element) {
                            element.imgUrl = dataService.getImageUrl(element._id)
                        }, this);
                        console.log($scope.followerInfo);
                    })
                }
            };

            $scope.toggleFollow = function(){
                //was following, checked unfollow
                if($scope.isFollowing){
                    dataService.updateFollowing("stop", sessionStorage.getItem('userId'), $scope.userId);
                }else{
                    //was not following, checked follow
                    dataService.updateFollowing("start", sessionStorage.getItem('userId'), $scope.userId);
                }
                $scope.isFollowing = !$scope.isFollowing;
                
            }

            $scope.goToUserBoard = function(){
                console.log("in goToUserBoard")
                $location.path('/launch-board/' + $scope.userId);
            }

            $scope.goToProfile = function(id){
                $location.path('/account/' + id);
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
