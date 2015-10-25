angular.module("app").factory("wsService", function($location, $window, userService, msgService) {
    // var url = "ws://10.25.164.246:8001";
    var url = "ws://" + $window.location.hostname + ":8001";
    var webSocket = new WebSocket(url);

    webSocket.onmessage = function (event) {
        console.log('onmessage, ' + event.data);
        if (event.data.indexOf(':all:') >= 0) {
            var companionsStr = event.data.slice(":all:".length);
            var companions = JSON.parse(companionsStr);
            userService.setCompanions(companions);
        }
        else if (event.data.indexOf(':newOne:') >= 0) {
            console.log("test newOne");
            var userStr = event.data.slice(":newOne:".length);
            var newUser = JSON.parse(userStr);
            if (userService.getUser().name != newUser.name) {
                userService.addCompanion(newUser);
            }
        }
        else if (event.data.indexOf(':logout:') >= 0) {
            var userName = event.data.slice(":logout:".length);
            userService.removeCompanion(userName);
        }
        else if (event.data.indexOf(':msg:') >= 0) {
            var msgParts = event.data.slice(":msg:".length).split(':');
            var author = msgParts[0];
            var msg = msgParts[1];
            msgService.add({msg: msg, author: author});
        }
    };

    webSocket.onclose = function (event) {
        userService.clearUser();
        userService.clear();

        $location.url('/');
    };

    function init(user) {
        // Tell everybody about yourself
        webSocket.send(":newOne:" + JSON.stringify(user));

        // Get info about another users
        webSocket.send(":all:");
    }

    function send(user, msg) {
        webSocket.send(":msg:" + user.name + ":" + msg);
    }

    return {
        init: init,
        send: send,
        logout: logout
    };
});
