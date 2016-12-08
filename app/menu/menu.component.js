'use strict';

angular.module('raceConditions')
    .controller('menuController',
        function menuController($scope, $rootScope, $window) {
            var init = function () {
                if ($rootScope.token === null) {
                    $window.alert("You need to login first in order to see your created tables");
                }
                else $window.alert("aSDASD");
            };
            init();
            $window.alert("hola");
        });