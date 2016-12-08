'use strict';

// Define the `phonecatApp` module
var mod = angular.module('raceConditions', ['ngRoute']);
mod.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'register/register.view.html',
            controller: 'registerController'
        })
        .when('/mainMenu', {
            templateUrl: 'menu/menu.view.html',
            component: 'menu/menu.component.js'
        })
        .when('/table', {
            templateUrl: 'table/table.view.html',
            controller: 'tableController'
        })
        .otherwise({
            redirectTo: '/login'
        })
}]);
