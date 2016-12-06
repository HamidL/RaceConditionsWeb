'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions').
  component('formList', {
    templateUrl:'register/register.view.html',
    controller: function registerController($scope) {
        $scope.notRegistered=false;

        $scope.login = function (){

        }

        $scope.create = function (){

        }

        function validateUsername(username){

        }
        function validatePassword(password){

        }
        function validateMail(mail){

        }
    }
  });
