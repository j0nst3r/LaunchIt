"use strict"

describe("Launch Board", function () {
	let dataService = {}
	let modal = {}
	let ctrl	// Test victim, note LET instead of VAR (using VAR will result in... bad things)

	beforeEach(module('launchBoard'))	// Load component module

	beforeEach(() => {	// Setup mocks
		const q = { // Mock promise
			then: () => { }
		}

		dataService = {
			getLaunches: owner => {}
		}
		spyOn(dataService, 'getLaunches').and.returnValue(q)

		modal = {
			open: () => {}
		}
		spyOn(modal, 'open').and.returnValue({
			result: q
		})
	})

	beforeEach(inject(function ($componentController) {
		ctrl = $componentController('launchBoard', {
			$uibModal: modal,
			dataService: dataService
		})	// Inject component controller using loader
	}))
	// Fixture/setup complete, only feature methods below

	it("reload calls dataService.getLaunches", () => {
		ctrl.reload()

		expect(dataService.getLaunches.calls.count()).toBe(1)
	})

	it("views inside a modal", () => {
		const launch = {
			name: "TestoLaunch"
		}

		ctrl.view(launch, false)

		expect(modal.open.calls.count()).toBe(1)
	})
	it("edits inside a modal", () => {
		const launch = {
			name: "TestoLaunch"
		}

		ctrl.view(launch, true)

		expect(modal.open.calls.count()).toBe(1)
	})
})
