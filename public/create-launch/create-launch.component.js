"use strict"

angular.
	module('createLaunch').
	component('createLaunch', {
		templateUrl: "create-launch/create-launch.template.html",
		controller: function($scope, $rootScope, $location, dataService) {
			$scope.imgList = []
			$scope.test = function(fieldName, fileList) {
				for(let i = 0; i < fileList.length; i++) {
					$scope.$apply(function() {
						$scope.imgList.push(fileList[i])

					})
					console.log($scope.imgList[i])
				}
			}
			$scope.test2 = function() {
				console.log("Hello")
			}
			$scope.create = function(launch){
				if($('input[type=file]')[0].files.length > 5) {
					alert("Cannot select more than 5 files")
				}
				else {
					var newLaunch = launch;
					var userId = sessionStorage.getItem('userId');
					newLaunch.owner = userId
					var formData = new FormData();
					// formData.append('JSON', JSON.stringify(newLaunch))
					formData.append('body', JSON.stringify(newLaunch));
					for(let i = 0; i < $('input[type=file]')[0].files.length; i++) {
						formData.append('file', $('input[type=file]')[0].files[i]); 
					}
					                // formData.append('file', $('input[type=file]')[0].files); 
					for(let ket in formData.keys()){
						console.log(ket)
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
		}
	})