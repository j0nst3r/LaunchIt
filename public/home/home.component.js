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
                this.isPrivate = this.userId == undefined
                this.dataService = dataService
                if (this.isPrivate) this.userId = sessionStorage.getItem('userId')	// Apply logged-in user's ID
                this.favoriteLaunches = this.dataService.getFavoriteLaunches(this.userId)
                this.reload()
            }

            this.reload = function() {
                dataService.getAllLaunches().then( launchArray => {
                    this.launches = launchArray
                    // set launches as an array
                    for (let i = 0; i < this.launches.length; i++) {
                        let launch = this.launches[i]

                        this.launches[i].nay = function(){
                            let userId = sessionStorage.getItem('userId')
                            let yayVoters = launch.voteYay

                            // if userId is in launch.voteYay, remove from launch.voteYay
                            for (let i = 0; i < yayVoters.length; i++) {
                                if (userId == yayVoters[i]) {
                                    dataService.uncastVote('up', userId, launch._id);
                                }
                            }
                            let nayVoters = launch.voteNay

                            // add userId to launch.voteNay
                            for (let i = 0; i < nayVoters.length; i++) {
                                if (userId == nayVoters[i]) {
                                    return
                                }
                            }
                            dataService.castVote('down', userId, launch._id);
                        }
            
                        this.launches[i].yay = function(){
                            // if userId is in launch.voteNay, remove from launch.voteNay
                            // add userId to launch.voteYay
                            let userId = sessionStorage.getItem('userId')
                            let nayVoters = launch.voteNay
                            for (let i = 0; i < nayVoters.length; i++) {
                                if (userId == nayVoters[i]) {
                                    dataService.uncastVote('down', userId, launch._id);
                                }
                            }
                            let yayVoters = launch.voteYay
                            for (let i = 0; i < yayVoters.length; i++) {
                                if (userId == yayVoters[i]) {
                                    return
                                }
                            }
                            dataService.castVote('up', userId, launch._id)
                        }

                        this.launches[i].isFavorite = false

                        this.launches[i].isYayed = function() {
                            console.log(this.launches[i])
                            let voters = this.launches[i].voteYay
                            for (let i = 0; i < voters.length; i++) {
                                if (this.userId == voters[i]) {
                                    return true
                                }
                            }
                            return false
                        }

                        this.launches[i].isNayed = function() {
                            let voters = this.launches[i].voteNay
                            for (let i = 0; i < voters.length; i++) {
                                if (this.userId == voters[i]) {
                                    return true
                                }
                            }
                            return false
                        }

                        this.launches[i].getHeart = function() {
                            return this.isFavorite ? "favorite" : "favorite_border"
                        }
                    }
                    this.setFavoriteLaunches()
                }
            )}

            this.unFavoriteLaunch = function(launch, favs) {
                this.favoriteLaunches = favs
                for (let i = 0; i < this.favoriteLaunches.length; i++) {
                    if (this.favoriteLaunches[i]._id == launch._id) {
                        let index = this.launches.indexOf(this.favoriteLaunches[i])
                        this.dataService.removeFromFavorites(this.userId, launch._id)
                        this.favoriteLaunches.splice(i, 1)
                        launch.isFavorite =  false
                        return
                    }
                }
            }

            this.favoriteLaunch = function(launch, favs) {
                this.favoriteLaunches = favs
                for (let i = 0; i < this.launches.length; i++) {
                    if (this.launches[i]._id == launch._id && !this.launches[i].isFavorite) {
                        let index = this.launches.indexOf(this.launches[i])
                        this.dataService.addToFavorites(this.userId, launch._id)
                        this.favoriteLaunches.push(launch)
                        this.launches[index].isFavorite = true
                        return
                    }
                }
            }

             this.toggleFavorite = function(launch) {
                if (launch.isFavorite) {
                    this.dataService.getFavoriteLaunches(this.userId).then( favs => this.unFavoriteLaunch(launch, favs))
                } else {
                    this.dataService.getFavoriteLaunches(this.userId).then( favs => this.favoriteLaunch(launch, favs))
                }

                
             }

            this.view = function (launch) {
                $uibModal.open({
                    component: 'launch',
                    resolve: {
                        launch: launch,
                        edit: false
                    }
                })
            }

            this.setFavoriteLaunches = function() {
                this.dataService.getFavoriteLaunches(this.userId).then( favs => {
                    this.favoriteLaunches = favs
                    let j = 0
                    for (let i = 0; i < this.favoriteLaunches.length; i++) {
                        for (j = 0; j < this.launches.length; j++) {
                            if (this.favoriteLaunches[i]._id == this.launches[j]._id) {
                                this.launches[j].isFavorite = true
                                break
                            }
                        }
                    }
                })
            }
        }]
    })

    