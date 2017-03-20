"use strict"

angular.
	module('createLaunch').
	component('createLaunch', {
		templateUrl: "create-launch/create-launch.template.html",
		controller: function($scope, $rootScope, $location, dataService) {
			$scope.create = function(launch){
				var newLaunch = launch;
				var userId = sessionStorage.getItem('userId');
				newLaunch.owner = userId
				dataService.createLaunch(newLaunch).then(function(body) {
					console.log(JSON.stringify(body.data));
				})
				$location.path('/launch-board-private')
				console.log(newLaunch);
			}
		}
	})