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

				if(this.edit) this.launch.files = $("input[type=file]")[0].files	// Add files container
				this.title = (this.edit ? "Edit: " : "") + this.launch.name

				initFileListener()
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
	function initFileListener() {
		var fileUpload = document.getElementById('uploads')
		if(fileUpload != null) {
			fileUpload.onchange = function () {
			var preview = document.getElementById('preview')
			if (fileUpload.files.length > 5) {
				alert("Please select no more than 5 images")
				$('uploads').val("")
				while (preview.hasChildNodes()) {
					preview.removeChild(preview.lastChild)
				}
				preview.innerHTML = "Please upload up to 5 images"
			}
			else {
				while (preview.hasChildNodes()) {
					preview.removeChild(preview.lastChild)
				}
				for (let i = 0; i < fileUpload.files.length; i++) {
					var file = fileUpload.files[i]
					var reader = new FileReader()
					reader.onload = function (e) {
						var img = document.createElement('img')
						img.height = "100"
						img.width = "100"
						img.src = e.target.result
						preview.appendChild(img)
					}
					reader.readAsDataURL(file)
				}
			}
		}

		}

	}