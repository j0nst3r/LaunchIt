"use strict"

angular.
	module('launchBoard').
	component('launchBoard', {
		templateUrl: "launch-board/launch-board.template.html",

		bindings: {
			isPrivate: '@'
		},

		controller: ["$location", function (location) {

			this.launches = [
				new Launch("Cabbage", "Cabbage or headed cabbage (comprising several cultivars of Brassica oleracea) is a leafy green or purple biennial plant, grown as an annual vegetable crop for its dense-leaved heads.", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/1920px-Cabbage_and_cross_section_on_white.jpg"),
				new Launch("Celery", "Celery (Apium graveolens), a marshland plant in the family Apiaceae, has been cultivated as a vegetable since antiquity. Celery has a long fibrous stalk tapering into leaves. Depending on location and cultivar, either its stalks, leaves, or hypocotyl are eaten and used in cooking.", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Illustration_Apium_graveolens0.jpg/800px-Illustration_Apium_graveolens0.jpg"),
				new Launch("Dill", "Dill (Anethum graveolens) is an annual herb in the celery family Apiaceae.", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Illustration_Anethum_graveolens0.jpg/800px-Illustration_Anethum_graveolens0.jpg"),
				new Launch("Kale", "Kale (English IPA /keɪl/) or leaf cabbage refers to certain vegetable cultivars of the plant species Brassica oleracea. A kale plant has green or purple leaves and the central leaves do not form a head (as with headed cabbages). Kales are considered to be closer to wild cabbage than most domesticated forms of Brassica oleracea.", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Boerenkool.jpg/1024px-Boerenkool.jpg"),
				new Launch("Beetroot", "The beetroot is the taproot portion of the beet plant, usually known in North America as the beet, also table beet, garden beet, red beet, or golden beet. It is one of several of the cultivated varieties of Beta vulgaris grown for their edible taproots and their leaves (called beet greens)", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Detroitdarkredbeets.png/220px-Detroitdarkredbeets.png")
			]

			this.edit = {}

			this.create = function (){
				location.path('/create-launch')
			}
		}]
	})

function Launch(name, description, image) {	// TODO Grab these from DB
	if (Launch.globId == undefined) Launch.globId = 0

	this.id = Launch.globId++

	this.name = name
	this.description = description
	this.image = image

	this.yays = 0
	
	this.yay = () => this.yays++
	this.nay = () => this.yays--
}
