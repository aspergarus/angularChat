(function(module) {

    var ctrl = function ($window, $scope, $location, userService, wsService) {
        if (!userService.getUser()) {
            $location.url('/');
        }

        // Send message from input
        $scope.sendMsg = function(message) {
            event.preventDefault();

            // Send message from current user
            wsService.send(userService.getUser(), message);
        };

        $scope.logout = function() {
            debugger;
            wsService.logout();
            userService.clearUser();
            userService.clear();

            $location.url('/');
        };

        $scope.companions = userService.getCompanions();
    };

    module.controller("chatCtrl", ctrl);

}(angular.module("app")));
