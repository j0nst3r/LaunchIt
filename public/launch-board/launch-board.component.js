"use strict"

function LaunchBoardController() {
	this.launches = [
		{
			name: "Launch4",
			description: "SuperLaunch"
		}
	]
}

angular.
	module('launchBoard').
	component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",
		controller: LaunchBoardController
	})