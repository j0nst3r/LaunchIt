"use strict"

angular.
	module('createLaunch').
	component('createLaunch', {
		templateUrl: "create-launch/create-launch.template.html",
		controller: function($scope, $rootScope, $location, dataService) {
			$scope.imgList = []
			var fileUpload = document.getElementById('uploads')
			fileUpload.onchange = function() {
				var preview = document.getElementById('preview')
				if(fileUpload.files.length > 5) {
					alert("Please select no more than 5 images")
					$('uploads').val("")
					while(preview.hasChildNodes()) {
						preview.removeChild(preview.lastChild)
					}
					preview.innerHTML = "Please upload up to 5 images"
				}
				else {
					while(preview.hasChildNodes()) {
						preview.removeChild(preview.lastChild)
					}
					for(let i = 0; i < fileUpload.files.length; i++) {
						var file = fileUpload.files[i]
						var reader = new FileReader()
						reader.onload = function(e) {
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

			$scope.create = function(launch){
				// SHouldn't need this check anymore because it is handled in the file upload process
				// if($('input[type=file]')[0].files.length > 5) {
				// 	alert("Cannot select more than 5 files")
				// }
					var newLaunch = launch;
					var userId = sessionStorage.getItem('userId');
					newLaunch.owner = userId
					var formData = new FormData();
					formData.append('body', JSON.stringify(newLaunch));
					for(let i = 0; i < $('input[type=file]')[0].files.length; i++) {
						formData.append('file', $('input[type=file]')[0].files[i]); 
					}
					console.log(JSON.stringify(newLaunch))
					$.ajax({
						url : 'http://localhost:8080/api/createLaunch',
						dataType : 'json',
						type : 'POST',
						data : formData,
						contentType : false,
						cache : false,
						processData : false,
						beforeSend : function() {
							console.log(JSON.stringify(formData))
						}.bind(this),
						success : function (response) {
							console.log(response)
						}.bind(this),
						error : function (xhr, status, err) {
							console.log("Error: " + err)
						}.bind(this)

					})
			}
		}
	})