"use strict"

describe("Launch Board", function () {
	beforeEach(module('launchBoard'))	// Load module

	describe("LaunchBoard", function () {
		let ctrl
		beforeEach(inject(function($componentController) {
			ctrl = $componentController('launchBoard')	// Get controller
		}))

		it("should have launches", () => {
			expect(ctrl.launches).not.toBe(null)
		})
	})
})
