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
                this.favoriteLaunches = this.dataService.getFavoriteLaunches(this.userId)
                this.reload()
            }

            this.reload = function() {
                console.log("In reload");
                dataService.getAllLaunches().then( launchArray => {
                    this.launches = launchArray
                    // set launches as an array
                    for (let i = 0; i < this.launches.length; i++) {
                        
                        this.launches[i].nay = function(){
                            let nayVoters = this.launches[i].voteNay
                            let userId = sessionStorage.getItem('userId')
                            for (let i = 0; i < nayVoters.length; i++) {
                                if (userId == nayVoters[i]) {
                                    this.dataService.uncastVote('down', userId, this.launches[i]._id);
                                    return
                                }
                            }
                            this.dataService.castVote('down', userId, this.launches[i]._id);
                        }
            
                        this.launches[i].yay = function(){
                            let yayVoters = this.launches[i].voteYay
                            let userId = sessionStorage.getItem('userId')
                            for (let i = 0; i < yayVoters.length; i++) {
                                if (userId == yayVoters[i]) {
                                    this.dataService.uncastVote('up', userId, this.launches[i]._id);
                                    return
                                }
                            }
                            this.dataService.castVote('up', userId, this.launches[i]._id);
                        }

                        this.launches[i].isFavorite = false
                            // if launch is favorited, remove from user's favorite list and return, else add to user's favorite list

                        this.launches[i].isFavoriteLaunch = function() {
                            return this.launches[i].isFavorite
                        }

                        this.launches[i].isYayed = function() {
                            let voters = this.launches[i].voteYay
                            let userId = sessionStorage.getItem('userId')
                            for (let i = 0; i < voters.length; i++) {
                                if (userId == voters[i]) {
                                    return false
                                }
                            }
                        }
                    }
                    this.setFavoriteLaunches()
                }
            )}

             this.toggleFavorite = function(launch){
                console.log("in toggleFavorite()")
                this.dataService.getFavoriteLaunches(this.userId).then( favs => {
                    this.favoriteLaunches = favs
                    for (let i = 0; i < this.favoriteLaunches.length; i++) {
                        if (this.favoriteLaunches[i]._id == launches[i]._id && this.favoriteLaunches[i].isFavorite) {
                            let index = this.launches.indexOf(this.favoriteLaunches[i])
                            console.log("it is a favorite, unfavoriting")
                            this.dataService.removeFromFavorites(sessionStorage.getItem('userId'), this.favoriteLaunches[i])
                            this.favoriteLaunches.splice(i, 1)
                            this.launches[index].isFavorite =  false
                            return
                        }
                    }
                })
                this.dataService.getAllLaunches(this.userId).then( launches => {
                    for (let i = 0; i < launches.length; i++) {
                        console.log(launches[i])
                        if (launches[i]._id == launches[i]._id && !launches[i].isFavorite) {
                            console.log("it is a not favorite, favoriting")
                            let index = this.launches.indexOf(launches[i])
                            console.log("index = " + index)
                            this.dataService.addToFavorites(sessionStorage.getItem('userId'), launches[i])
                            this.launches[index].isFavorite = true
                            return
                        }
                    }
                })
             }

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

    