"use strict"

angular.
	module('launchBoard').
	component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",

		bindings: {
			isPrivate: '@'
		},

		controller: ["$location", "dataService", function (location, dataService) {

			this.launches = [
				new Launch("LaunchIt", "A web application which shares the ideas of startup companies.", "https://lh6.googleusercontent.com/VqsfOtouEj7tSCMd9bodm722nzBCCSpTtPKyrQKjO2FykHILjjipkp01vvYaspTZHLiZyTaN1V_CzIc=w1920-h945"),
				new Launch("Pinterest", "Find and save recipes, parenting hacks, style inspiration and other ideas to try.", "https://s-media-cache-ak0.pinimg.com/avatars/pinterest_1475538227_280.jpg"),
				new Launch("Kickstarter", "The world's largest funding platform for creative projects. A home for film, music, art, theater, games, comics, design, photography, and more.", "https://www.kickstarter.com/download/kickstarter-logo-k-color.png")
			]

			// this.launches = this.launches = dataService.getLaunches(sessionStorage.getItem('userId'))

			this.create = function () {
				location.path('/create-launch')
			}
			this.delete = function (launch) {
				let index = this.launches.indexOf(launch)
				if (index >= 0) this.launches.splice(index, 1)
			}
		}]
	})

function Launch(name, description, image) {	// TODO Grab these from DB
	this.name = name
	this.description = description
	this.image = image

	this.yays = 0
	
	this.yay = () => this.yays++
	this.nay = () => this.yays--

	this.editting = false
}
