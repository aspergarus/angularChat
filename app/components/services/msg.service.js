angular.module("app").factory("msgService", function() {
    var messages = [];

    function add(msg) {
        messages.push(msg);
    }

    function getAll() {
        return messages;
    }

    return {
        add: add,
        getAll: getAll
    };
});
