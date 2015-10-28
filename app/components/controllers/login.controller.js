(function(module) {

    var ctrl = function ($window, $scope, $location, userService, wsService) {
        // Login form
        $scope.login = function(event, user) {
            event.preventDefault();

            // Save user to current user, and add it to other users in chat.
            userService.setUser(user);
            userService.addCompanion(user);
            wsService.init(user);

            $location.url('/chat');
        };

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
    };

    module.controller("loginCtrl", ctrl);

}(angular.module("app")));
