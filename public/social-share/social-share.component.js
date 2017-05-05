"use strict"

angular.
	module('socialShare').
	component('socialShare', {
		templateUrl: "social-share/social-share.template.html", 
		bindings: {
			launchId: '<'
		},
		controller: function($scope, $rootScope, $location, dataService) {
			this.launchObject = {};
			// /getLaunchById/launchId

			
			dataService.getLaunchById(this.launchId).then(function(data){

            });

			}
	})