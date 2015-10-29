angular.module("app").factory("userService", function($window) {

    var companions = JSON.parse($window.localStorage.getItem('companions')) || {};
    var currentUser = JSON.parse($window.localStorage.getItem('curUser')) || {};

    function setUser(user) {
        currentUser = user;
        $window.localStorage.setItem('curUser', JSON.stringify(user));
    }

    function getUser() {
        return currentUser;
    }

    function clearUser() {
        currentUser = {};
        $window.localStorage.removeItem('curUser');
    }

    function setCompanions(newCompanions) {
        for (var name in newCompanions) {
            if (!companions.hasOwnProperty(name)) {
                companions[name] = newCompanions[name];
            }
        }

        $window.localStorage.setItem('companions', JSON.stringify(companions));
    }

    function addCompanion(newUser) {
        if (!companions[newUser.name]) {
            companions[newUser.name] = newUser;
        }
        $window.localStorage.setItem('companions', JSON.stringify(companions));
    }

    function getCompanions() {
        return companions;
    }

    function clear() {
        companions = {};
        $window.localStorage.removeItem('companions');
    }

    function removeCompanion(userName) {
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
