angular.module('app')
    .directive('inputEnter', function($document, $parse) {
        return {
            link: function(scope, elem, attr) {
                var fn = $parse(attr.inputEnter);

                $document.on('keydown', function(e) {
                    if (e.keyCode == 13) {
                        scope.$apply(function() {
                            fn(scope, {$event: e}); // Execute function of input and pass "e" as $event.
                        });
                    }
                });

            }
        };
    });