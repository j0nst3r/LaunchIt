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
			this.launchObject = {
				"_id": "5902260cf7b6c130ac446e44",
				"owner": "590220dbbab41c222c23b830",
				"name": "test",
				"description": "test",
				"voteNay": [],
				"voteYay": ["58cef1b035ada1ee41bca10a","58bf7026287c9ac02813c4fe"],
    			"website": ["https://media.tenor.co/images/e1d470401940172b3ddc7765ddca69c2/tenor.gif"],
				"comments": [
					"testing adding comment",
					"testing adding comment",
					"testing adding comment",
					"testing adding comment",
        			"testing adding comment",
        			"adding new comment api test"],
    			"tags": ["test"]
			}; //temp to work with for now


			// /getLaunchById/launchId
			
			//dataService.getLaunchById(this.launchId).then(function(data){

            //});

			}
	})