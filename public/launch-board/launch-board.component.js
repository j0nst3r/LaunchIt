"use strict"

angular
	.module('launchBoard')
	.component('launchBoard', {
		templateUrl: "../home/home.template.html",

		bindings: {
			userId: '<'
		},

		controller: ["$location", "$uibModal", "dataService", '$window', '$scope', 'uiController', '$route',  
		function ($location, $uibModal, dataService, $window, $scope, uiController, $route) {
			$scope.columnSpec = uiController.setup($window.innerWidth);
			$scope.getIfStatement = function(blah, cardIndex){
				return (cardIndex % blah.ngif.col == blah.ngif.rem);
			}

			// call on dataService to all the launches and then
			// store each launch object into $scope.launches
			angular.element($window).bind('resize', function() {
				$scope.$apply(function(){
					$scope.columnSpec = uiController.setup($window.innerWidth);
				});
			});

			this.createLaunchCard = {
				isCreate: true
			}
			
			this.$onInit = function () {
				this.isPrivate = this.userId == undefined
				this.launches = [];
				this.pageIndex = 0;this.noMore = false;
				this.curBoard = 'myBoard';
				if (this.isPrivate) this.userId = sessionStorage.getItem('userId')	// Apply logged-in user's ID

				this.reload(this.pageIndex)
			}

			this.loadMoreLaunches = function(){
                this.reload(this.pageIndex)
            }

			this.changeBoard = function(boardType){
				if(this.curBoard == boardType){
					return
				}else{
					this.curBoard = boardType;
					this.launches = [];
					this.pageIndex = 0;
					if(boardType == 'myBoard')
						this.reload(0)
					else
						this.viewFavorites()
				}
			}

			this.reload = function (pageIndex) {
				this.isEditable = true
				console.log("in reload() isEditable = " + this.isEditable)
				dataService.getLaunches(this.userId, pageIndex)
					.then(data => {
						if(pageIndex == 0){
							this.launches = [];
						}
						if (this.isEditable && pageIndex == 0) {
							
							this.launches.unshift(this.createLaunchCard)
						}

						this.launches = this.launches.concat(data.launches);
                    	this.pageIndex++;
                    	this.noMore = data.noMore;
						console.log(this.launches);
						for (let i = 1; i < this.launches.length; i++) {
							this.launches[i].yays = this.launches[i].voteYay.length - this.launches[i].voteNay.length;
						
							this.launches[i].yay = function () {
								
                            		toastr.success('Thank You for casting your vote');
									dataService.castVote('up', sessionStorage.getItem('userId'), launches[i]._id)
										.then(launch => this.yays = launch.voteYay.length - launch.voteNay.length)
								}
							this.launches[i].nay = function () {
									
                            		toastr.success('Thank You for casting your vote');
									dataService.castVote('down', sessionStorage.getItem('userId'), launches[i]._id)
										.then(launch => this.yays = launch.voteYay.length - launch.voteNay.length)
								}
						}
					})
			}

			this.create = function () {
				$location.path('/create-launch')
			}

			this.view = function (launch, edit) {
				if (launch == undefined) {
					this.create()
					return
				}
				$uibModal.open({
					component: 'launch',
					resolve: {
						launch: launch,
						edit: edit
					}
				}).result.then(result => {
					const launch = result.data
					console.log(result.data.tags)
					if(result.data.tags.length !== 0){
						launch.tags = result.data.tags
					}
					console.log((result.del ? "Deleting" : "Updating") + ": " + JSON.stringify(launch));
					(result.del ? dataService.deleteLaunch(launch) : dataService.updateLaunch(launch))
						.then(() =>this.reload(0))
				})
			}

			this.viewFavorites = function() {
				this.isEditable = false
				console.log("in viewFavorites() isEditable = " + this.isEditable)
				dataService.getFavoriteLaunches(this.userId)
					.then(launches => {
						this.launches = launches

						for (let i = 0; i < this.launches.length; i++) {
							this.launches[i].yays = this.launches[i].voteYay.length - this.launches[i].voteNay.length;
						
							this.launches[i].yay = function () {
                            		toastr.success('Thank You for casting your vote');
									dataService.castVote('up', sessionStorage.getItem('userId'), launches[i]._id)
								}
							this.launches[i].nay = function () {
									
                            		toastr.success('Thank You for casting your vote');
									dataService.castVote('down', sessionStorage.getItem('userId'), launches[i]._id) 
								}
						}
					})
			}
		}]
	})
