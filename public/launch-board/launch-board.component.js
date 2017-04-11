"use strict"

angular
	.module('launchBoard')
	.component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",

		bindings: {
			isPrivate: '@'
		},

		controller: ["$location", "$uibModal", "dataService", function (location, $uibModal, dataService) {
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

			this.edit = function (launch) {
				$uibModal.open({
					component: 'edit',
					resolve: {
						meta: {
							title: "Edit Launch"
						},
						fields: {
							name: ['text', 'Name'],
							description: ['text', 'Description']
						},
						data: launch
					}
				}).result.then(result => {
					
					const launch = result.data
					console.log(launch)
					console.log((result.del ? "Deleting" : "Updating") + ": " + JSON.stringify(launch))

					result.del ? dataService.deleteLaunch(launch) : dataService.updateLaunch(launch)
						.then(() => this.reload())
				})
			}
		}]
	})
