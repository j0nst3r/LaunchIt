"use strict"

angular.
	module('launchBoard').
	component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",

		bindings: {
			isPrivate: '@'
		},

		controller: ["$location", "dataService", function (location, dataService) {
			this.reload = function () {
				dataService.getAllLaunches()
					.then(launches => {
						this.launches = launches

						for (let i = 0; i < this.launches.length; i++) {
							this.launches[i].yays = 0
						
							this.launches[i].yay = function () { this.yays++ }
							this.launches[i].nay = function () { this.yays-- }
						}
					})
			}
			
			this.launches = []
			this.reload()

			this.create = function () {
				location.path('/create-launch')
			}

			this.delete = function (launch) {
				
			}
		}]
	})
