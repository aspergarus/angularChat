angular.module("app").factory("wsService", function($rootScope, $location, $window, userService, msgService) {
    // var url = "ws://10.25.164.246:8001";
    var url = "ws://" + $window.location.hostname + ":8001";
    var webSocket = new WebSocket(url);

    webSocket.onmessage = function (event) {
        console.log('onmessage, ' + event.data);
        $rootScope.$apply(function(){
            if (event.data.indexOf(':all:') >= 0) {
                var companionsStr = event.data.slice(":all:".length);
                var companions = JSON.parse(companionsStr);
                userService.setCompanions(companions);
            }
            else if (event.data.indexOf(':newOne:') >= 0) {
                debugger;
                var userStr = event.data.slice(":newOne:".length);
                var newUser = JSON.parse(userStr);

                var currentUser = userService.getUser() || {};
                if (currentUser.name != newUser.name) {
                    userService.addCompanion(newUser);
                }
            }
            else if (event.data.indexOf(':logout:') >= 0) {
                var userName = event.data.slice(":logout:".length);
                userService.removeCompanion(userName);
            }
            else if (event.data.indexOf(':msg:') >= 0) {
                var msgInfo = event.data.slice(":msg:".length);
                var author = msgInfo.slice(0, msgInfo.indexOf(":"));
                var msg = msgInfo.slice(msgInfo.indexOf(":") + 1);
                msgService.add({author: author, msg: msg});
            }
        });
    };

    webSocket.onclose = function (event) {
        $rootScope.$apply(function() {
            userService.clearUser();
            userService.clear();

            $location.url('/');
        });
    };

    function init(user) {
        // Tell everybody about yourself
        webSocket.send(":newOne:" + JSON.stringify(user));

        // Get info about another users
        webSocket.send(":all:");
    }

    function send(userName, msg) {
        webSocket.send(":msg:" + userName + ":" + msg);
    }

    function logout() {
        var currentUser = userService.getUser();
        webSocket.send(":logout:" + currentUser.name);
    }

    return {
        init: init,
        logout: logout,
        send: send
    };
});
