
angular.module('LaunchesCtrl', ['edit','ui.bootstrap']).controller('LaunchesController', function($window, $scope, $rootScope, $location, $uibModal, dataService) {

	console.log($window.innerWidth);
	if($window.innerWidth < 768){
			//only want 1 column
			$scope.columnSpec = [];
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 1, "rem": 0}
			$scope.columnSpec.push(columnObj);
		}else if($window.innerWidth < 1000){
			//want 2 column
			$scope.columnSpec = [];
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 2, "rem": 0}
			$scope.columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 2, "rem": 1}
			$scope.columnSpec.push(columnObj);
			
		}else{
			//want 3 column
			$scope.columnSpec = [];
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 3, "rem": 0}
			$scope.columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 2, "rem": 1}
			$scope.columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 3, "rem": 2}
			$scope.columnSpec.push(columnObj);
		}

	$scope.getIfStatement = function(blah, cardIndex){
		return (cardIndex % blah.ngif.col == blah.ngif.rem);
	}

	// call on dataService to all the launches and then
	// store each launch object into $scope.launches
	angular.element($window).bind('resize', function () {
		if($window.innerWidth < 768){
			//only want 1 column
			$scope.columnSpec = [];
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 1, "rem": 0}
			$scope.columnSpec.push(columnObj);
		}else if($window.innerWidth < 1000){
			//want 2 column
			$scope.columnSpec = [];
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 2, "rem": 0}
			$scope.columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 2, "rem": 1}
			$scope.columnSpec.push(columnObj);
			
		}else{
			//want 3 column
			$scope.columnSpec = [];
			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 3, "rem": 0}
			$scope.columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 2, "rem": 1}
			$scope.columnSpec.push(columnObj);

			var columnObj = {};
			columnObj.size = 100;
			columnObj.ngif = {"col" : 3, "rem": 2}
			$scope.columnSpec.push(columnObj);
		}
		$scope.$apply();
	});

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

			launchObj.toggleFavorite = function(){
				// get the userId and the favorite list for that user
				userId = sessionStorage.getItem('userId')
				launchId = this.id
				
				// if launch is favorited, remove from user's favorite list and return, else add to user's favorite list
				dataService.getFavoriteLaunches(userId).then( function(favs){
					for (i in favs) {
						if (favs[i]._id == launchId) {
							dataService.removeFromFavorites(userId, launchId)
							return
						}
					}
					dataService.addToFavorites(userId, launchId)
				})
			}
		
        	// put the new launchObj into launches
        	$scope.launches.push(launchObj) 
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