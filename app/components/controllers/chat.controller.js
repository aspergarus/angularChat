(function(module) {

    var ctrl = function ($scope, $location, userService, wsService, msgService) {
        if (!userService.getUser()) {
            $location.url('/');
        }

        // Send message from input
        $scope.sendMsg = function(message) {
            event.preventDefault();

            var currentUser = userService.getUser();

            // Send message from current user
            wsService.send(currentUser.name, message);

            // Save message to messages via service
            msgService.add({author: currentUser.name, msg: message});
        };

        $scope.$watchCollection(userService.getCompanions, function(val) {
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
