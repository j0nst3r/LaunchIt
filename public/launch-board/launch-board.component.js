"use strict"

angular.
	module('launchBoard').
	component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",

		bindings: {
			isPrivate: '@'
		},

		controller: ['$location', function (location) {
			this.launches = [
				new Launch("https://images-na.ssl-images-amazon.com/images/I/31S%2BCZ82ofL._SY300_.jpg", "A duck"),
				new Launch("http://www.saintpetersblog.com/wp-content/uploads/2014/08/rubber-duck.jpg", "Another duck")
			]
		}]
	})

function Launch(image, description) {	// TODO Grab these from DB
	this.image = image
	this.description = description
	this.yays = 0
	
	this.yay = () => this.yays++
	this.nay = () => this.yays--
}