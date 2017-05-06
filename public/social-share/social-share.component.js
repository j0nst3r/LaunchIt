"use strict"

angular.
	module('socialShare').
	component('socialShare', {
		templateUrl: "social-share/social-share.template.html", 
		bindings: {
			launchId: '<'
		},
		
		controller: function($scope, $rootScope, $location, dataService, $route) {
			var launchId = $route.current.params.launchId;
			dataService.getLaunchById(launchId).then(function(data){
				$scope.launchObject = data;
				
				dataService.getDisplayName(data.owner).then(function(meName) {
					console.log(meName);
					$scope.fullName = meName;
					})
			
			});

		var accountRedirect = function() {
			window.location.href = "/account/" + launchObject.owner;
			}
		}
	})