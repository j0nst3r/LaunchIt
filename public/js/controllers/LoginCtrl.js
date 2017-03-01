(function () {
    angular.module("LoginController").controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootscope) {
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
    }
})();

