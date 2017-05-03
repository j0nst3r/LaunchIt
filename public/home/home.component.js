"use strict"
angular
	.module('home')
	.component('home', {
		templateUrl: "home/home.template.html",

		bindings: {
			userId: '<'
		},

        controller: ['$uibModal', 'dataService', '$window', '$scope', 'uiController', '$route',
        function($uibModal, dataService, $window, $scope, uiController, $route) {
            
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
            
            this.launches = []
            this.$onInit = function() {
                console.log("HomeViewController initialization")
                this.isPrivate = this.userId == undefined
                this.dataService = dataService
                if (this.isPrivate) this.userId = sessionStorage.getItem('userId')	// Apply logged-in user's ID

                this.reload()
            }

            this.reload = function() {
                console.log("In reload");
                dataService.getAllLaunches().then( launchArray => {
                    this.launches = launchArray
                    console.log(launchArray)
                    // set launches as an array
                    for (let i = 0; i < this.launches.length; i++) {
                        
                        this.launches[i].nay = function(){
                            this.dataService.castVote('down', sessionStorage.getItem('userId'), this.launches[i]._id);
                        }
            
                        this.launches[i].yay = function(){
                            this.dataService.castVote('up', sessionStorage.getItem('userId'), this.launches[i]._id);
                        }

                        this.launches[i].toggleFavorite = function(){
                            // if launch is favorited, remove from user's favorite list and return, else add to user's favorite list
                            for (let i = 0; i < this.favoriteLaunches.length; i++) {
                                if (this.favoriteLaunches[i]._id == this._id) {
                                    index = this.launches.indexOf(this.favoriteLaunches[i])
                                    if (this.favoriteLaunches[i].isFavorite) {
                                        this.dataService.removeFromFavorites(sessionStorage.getItem('userId'), this.favoriteLaunches[i])
                                        this.favoriteLaunches.splice(i, 1)
                                        this.launches[index].isFavorite =  false
                                    } else {
                                        this.dataService.addToFavorites(sessionStorage.getItem('userId'), this.favoriteLaunches[i])
                                        this.launches[index].isFavorite = true
                                    }
                                }
                            }
                        }   
                    }
                    this.setFavoriteLaunches()
                }
            )}

            this.view = function (launch) {
                $uibModal.open({
                    component: 'edit',
                    resolve: {
                        meta: {
                            title: launch.name
                        },
                        fields: {
                            description: ['text', 'Description']
                        },
                        data: launch,
                        readonly: true
                    }
                })
            }

            this.setFavoriteLaunches = function() {
                this.dataService.getFavoriteLaunches(this.userId).then( favs => {
                    this.favoriteLaunches = favs
                    for (let i = 0; i < this.favoriteLaunches.length; i++) {
                        console.log(this.launches[i])
                        if (this.favoriteLaunches[i]._id == this.launches[i]._id) {
                            this.launches[i].isFavorite = true
                        } else {
                            this.launches[i].isFavorite = false
                        }
                    }
                })
            }
        }]
    })

    