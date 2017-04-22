
angular.module('LaunchesCtrl', ['edit','ui.bootstrap']).controller('LaunchesController', function($scope, $rootScope, $location, $uibModal, dataService) {

	// call on dataService to all the launches and then
	// store each launch object into $scope.launches
	dataService.getAllLaunches().then( function(launchArray) {
	
		// set launches as an array
		$scope.launches = [];
		
		// traverse through launchArray
		for (i in launchArray) { 
			// create launchObj, copy all the launchArray[i] attributes to launchObj
			var launchObj = { 	
					id:				launchArray[i]._id,
					owner:	 		launchArray[i].owner,
        			name:	 		launchArray[i].name,
        			tags: 			launchArray[i].tags,
        			promotion: 		launchArray[i].promotion,
        			promotionDate: 	launchArray[i].promotionDate,
       		 		comments: 		launchArray[i].comments,
       		 		website:		launchArray[i].website,
       				description: 	launchArray[i].description,
        			voteYay: 		launchArray[i].voteYay,
        			voteNay: 		launchArray[i].voteNay };
        
			launchObj.nay = function(){
				dataService.castVote('down', sessionStorage.getItem('userId'), this.id);
			}
			
			launchObj.yay = function(){
				dataService.castVote('up', sessionStorage.getItem('userId'), this.id);
			}

			launchObj.favorite = function(){
				dataService.addToFavorites(sessionStorage.getItem('userId'), this.id);
			}
		
        	// put the new launchObj into launches
        	$scope.launches.push(launchObj);
        }
	});
	
	$scope.view = function (launch) {
				$uibModal.open({
					component: 'edit',
					resolve: {
						meta: {
							title: launch.name
						},
						fields: {
							name: ['text', 'Name'],
							description: ['text', 'Description']
						},
						data: launch,
						readonly: true
					}
				})
			}
});