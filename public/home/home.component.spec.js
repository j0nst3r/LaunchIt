"use strict"

describe("Home", function () {
	beforeEach(module('home'))	// Load module

	describe("home", function () {
		let ctrl
		beforeEach(inject(function($componentController) {
			ctrl = $componentController('HomeViewController')	// Get controller
		}))

		it("should have launches", () => {
			expect(ctrl.launches).not.toBe(null)
		})
	})
})