(function () {

    angular.module('UserService').factory('UserService', UserService);

    function UserService($http) {

        var service = {
            loginUser : loginUser
        };

        return service;

        function loginUser(user, callback) {
            $http.post("/login", user).success(callback);
        }
    }

})