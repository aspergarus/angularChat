angular.module('app')
    .directive('message', function($document, $parse) {
        return {
            templateUrl: '/templates/message.html',
            scope: {
                text: '=',
                img: '=',
                owner: '='
            },
            controller: function($scope, userService) {
            }
        };
    });