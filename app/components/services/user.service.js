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
        var companions = getCompanions() || {};

        for (var name in newCompanions) {
            if (!companions[name]) {
                companions[name] = newCompanions[name];
            }
        }

        $window.localStorage.setItem('companions', JSON.stringify(companions));
    }

    function addCompanion(newUser) {
        var companions = getCompanions() || {};
        if (!companions[newUser.name]) {
            companions[newUser.name] = newUser;
        }
        $window.localStorage.setItem('companions', JSON.stringify(companions));
    }

    function getCompanions() {
        return JSON.parse($window.localStorage.getItem('companions'));
    }

    function clear() {
        $window.localStorage.removeItem('companions');
    }

    function removeCompanion(userName) {
        var companions = getCompanions() || {};
        if (companions[userName]) {
            delete companions[userName];
        }
        $window.localStorage.setItem('companions', JSON.stringify(companions));
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
