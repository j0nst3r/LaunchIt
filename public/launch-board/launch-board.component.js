"use strict"

angular.
	module('launchBoard').
	component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",

		bindings: {
			isPrivate: '@'
		},

		controller: ["$location", function (location) {
			this.isEdit = false
			this.launches = [
				new Launch("Duck1", "A duck", "https://images-na.ssl-images-amazon.com/images/I/31S%2BCZ82ofL._SY300_.jpg"),
				new Launch("Duck2", "Another duck", "http://www.saintpetersblog.com/wp-content/uploads/2014/08/rubber-duck.jpg")
			]
			this.create = function (){
				location.path('/create-launch')
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
}