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
            controller: 'menuController'
        })
        .when('/table', {
            templateUrl: 'table/table.view.html',
            component: 'table/table.component.js'
        })
        .otherwise({
            redirectTo: '/login'
        })
}]);
