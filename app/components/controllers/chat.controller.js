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

            // Clear form after send message
            $scope.msg = '';
        };

        $scope.$watchCollection(userService.getCompanions, function(val) {
            $scope.companions = val;
        });

        $scope.$watchCollection(msgService.getAll, function(val) {
            $scope.messages = val;
        });

        $scope.logout = function() {
            wsService.logout();
            userService.clearUser();
            userService.clear();

            $location.url('/');
        };

        $scope.currentUser = userService.getUser();
    };

    module.controller("chatCtrl", ctrl);

}(angular.module("app")));
