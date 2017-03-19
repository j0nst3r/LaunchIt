"use strict"

angular.
	module('createLaunch').
	component('createLaunch', {
		templateUrl: "create-launch/create-launch.template.html",
		controller: function($scope, $rootScope, $location, dataService) {
			$scope.create = function(launch){
				var newLaunch = launch;
				dataService.createLaunch(newLaunch).then(function(body) {
					console.log(JSON.stringify(body.data));
				})
				console.log(newLaunch);
			}
		}
	})