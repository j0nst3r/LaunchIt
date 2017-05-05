"use strict"

angular
	.module('launch', ['ui.bootstrap'])
	.component('launch', {
		templateUrl: 'launch/launch.template.html',

		bindings: {
			resolve: '<',
			close: '&',
			dismiss: '&'
		},
		controller: ['dataService', function (dataService) {
			this.$onInit = function () {
				this.launch = angular.copy(this.resolve.launch)
				this.edit = this.resolve.edit

				this.title = (this.edit ? "Edit " : "") + this.launch.name
				
			}

			this.return = function (del) {
				this.close({
					$value: {
						data: this.launch,
						del: del
					}
				})
			}
			this.ok = function () { this.return() }
			this.delete = function () { this.return(true) }
		}]
	})