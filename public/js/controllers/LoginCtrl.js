angular.module('LoginCtrl', []).controller('LoginController', function($scope, $rootScope, $location) {
	
    var vm = this;
    vm.login = login;

    function login(user) {
        UserService.login(user, function (response) {
            if(response == null){

            } else {
                $rootscope.currentUser = response;
                $location.url("/home")
            }
        });
    }
});

