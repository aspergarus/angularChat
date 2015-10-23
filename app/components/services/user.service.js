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

    function setCompanions(allCompanions) {
        var stat = allCompanions.reduce(function(prev, cur) {
            prev[cur.name] = prev[cur.name] ? prev[cur.name] + 1 : 1;
            return prev;
        }, {});

        var cleanedCompanions = [];
        for (var name in stat) {
            var findComp = allCompanions.filter(function(el) {
                return el.name == name;
            });
            if (findComp.length > 0)
            cleanedCompanions.push(findComp[0]);
        }
        $window.localStorage.setItem('companions', JSON.stringify(cleanedCompanions));
    }

    function addCompanion(newUser) {
        var companions = getCompanions();
        if (companions) {
            companions.push(newUser);
            setCompanions(companions);
        }
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
