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
        .when('/table/modifyTable', {
            templateUrl: 'table/table.view.html',
            controller: 'tableRowController'
        })
        .when('/table/modifyCol', {
            templateUrl: 'table/table.col.html',
            controller: 'tableColController'
        })
        .when('/table/modifyPermissions', {
            templateUrl: 'table/table.permissions.html',
            controller: 'tablePermissionsController'
        })
        .otherwise({
            redirectTo: '/login'
        })
}]);
