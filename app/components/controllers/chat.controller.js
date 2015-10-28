(function(module) {

    var ctrl = function ($scope, $location, userService, wsService) {
        if (!userService.getUser()) {
            $location.url('/');
        }

        // Send message from input
        $scope.sendMsg = function(message) {
            event.preventDefault();

            // Send message from current user
            wsService.send(userService.getUser(), message);
        };

        $scope.$watch(userService.getCompanions, function(val) {
            debugger;
            $scope.companions = val;
        });

        $scope.logout = function() {
            debugger;
            wsService.logout();
            userService.clearUser();
            userService.clear();

            $location.url('/');
        };

        // $scope.companions = userService.getCompanions();

        $scope.currentUser = userService.getUser();
    };

    module.controller("chatCtrl", ctrl);

}(angular.module("app")));
