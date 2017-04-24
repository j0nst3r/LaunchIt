"use strict"

angular.
	module('createLaunch').
	component('createLaunch', {
		templateUrl: "create-launch/create-launch.template.html",
		controller: function($scope, $rootScope, $location, dataService) {
			$scope.create = function(launch){
                var newLaunch = launch;
                var userId = sessionStorage.getItem('userId');
                newLaunch.owner = userId
                var formData = new FormData();
                // formData.append('JSON', JSON.stringify(newLaunch))
                formData.append('body', JSON.stringify(newLaunch));
                formData.append('file', $('input[type=file]')[0].files[0]); 
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
	})