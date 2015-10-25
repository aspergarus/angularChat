(function () {
    "use strict";
    angular.module("app", ['ngRoute', "chart.js"]).config(function($routeProvider) {
        $routeProvider.when('/', {
            'templateUrl': '/templates/login.html',
            'controller': 'loginCtrl'
        }).when('/chat', {
            templateUrl: '/templates/main.html',
            'controller': 'chatCtrl'
        })
    });
})();
