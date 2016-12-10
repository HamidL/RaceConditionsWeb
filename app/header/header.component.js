'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions')
    .controller('headerController',
        function headerController($scope, $rootScope) {

            $rootScope.home_class = "active";
            $rootScope.table_class = "";

            $rootScope.changeActive = function (op){
                console.log("Change " + op);
                if(op == 1){
                    $rootScope.home_class = "active";
                    $rootScope.table_class = "";
                }
                else if (op == 0){
                    $rootScope.home_class = "";
                    $rootScope.table_class = "active";
                }
            };
});
