(function(module) {

    var ctrl = function ($window, $scope, $location, userService, wsService) {
        // Login form
        $scope.login = function(event, user) {
            event.preventDefault();

            debugger;

            // Save user to current user, and add it to other users in chat.
            userService.setUser(user);
            wsService.init(user);

            $location.url('/chat');
        }
    };

    module.controller("loginCtrl", ctrl);

}(angular.module("app")));
