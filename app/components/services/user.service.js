angular.module("app").factory("userService", function($window) {
    function setUser(user) {
        $window.localStorage.setItem('curUser', JSON.stringify(user));
    }

    function getUser() {
        return JSON.parse($window.localStorage.getItem('curUser'));
    }

    function clearUser() {
        $window.localStorage.removeItem('curUser');
    }

    function setCompanions(newCompanions) {
        var oldCompanions = getCompanions();

        if (oldCompanions) {
            for (var i = 0; i < newCompanions.length; i++) {
                var alreadyExisted = oldCompanions.filter(function(comp) {
                    return comp.name != newCompanions[i].name;
                });
                if (alreadyExisted.length > 0) {
                    newCompanions.splice(i, 1);
                    i--;
                }
            }
        }
        debugger;

        newCompanions = newCompanions || [];

        $window.localStorage.setItem('companions', JSON.stringify(newCompanions.concat(oldCompanions)));
    }

    function addCompanion(newUser) {
        debugger;
        var companions = getCompanions() || [];
        companions.push(newUser);
        setCompanions(companions);
    }

    function getCompanions() {
        return JSON.parse($window.localStorage.getItem('companions'));
    }

    function clear() {
        $window.localStorage.removeItem('companions');
    }

    function removeCompanion(userName) {
        var comp = getCompanions();
        if (comp) {
            comp = comp.filter(function(el) {
                return el.name != userName;
            });
            setCompanions(comp);
        }
    }

    return {
        setUser: setUser,
        getUser: getUser,
        clearUser: clearUser,
        setCompanions: setCompanions,
        addCompanion: addCompanion,
        getCompanions: getCompanions,
        removeCompanion: removeCompanion,
        clear: clear
    };
});
