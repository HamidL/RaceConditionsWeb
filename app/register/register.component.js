'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions')
    .controller('registerController',
        function registerController($scope, $timeout, $http, $rootScope, $window,$location) {

            $rootScope.RCURL="PUT YOUT URL HERE";

            var init = function () {
                $rootScope.registered = false;
                $scope.hasUsername = true;
            };
            init();

            var loginSuccess = function(responseData){
                if(responseData.data.status == "error"){
                    $rootScope.registered = false;
                    $location.url('/login');
                }
                else{
                    $rootScope.accessToken = responseData.data.ret.accesToken;

                    $rootScope.requestConfig = {
                        headers: { 'Content-Type': 'application/json',
                            'accessToken':responseData.data.ret.accesToken
                        }
                    };

                    $location.url('/mainMenu');
                    $rootScope.registered = true;

                }
            };

            var loginError = function(error){
                $window.alert("An error has ocurred during the execution");
                $location.url('/login');
            };

            var login = function () {
                var data = JSON.stringify({
                    "username": $scope.name,
                    "password": $scope.password
                });
                $http.post($rootScope.RCURL+"/loginAPI/v1/login",data,$rootScope.requestConfig).then(loginSuccess,loginError);
            };

            $scope.login = function (){
                if (validateUsername($scope.name) !== true) {
                    $window.alert("The username doesn't match the requirements");
                    return;
                }
                else if (validatePassword($scope.password) !== true) {
                    $window.alert("The password doesn't match the requirements");
                    return;
                }
                login();
            };

            $scope.create = function (){
                if (validateUsername($scope.userReg) !== true) {
                    $window.alert("The usernameReg doesn't match the requirements");
                    return;
                }
                else if (validatePassword($scope.passReg) !== true) {
                    $window.alert("The password doesn't match the requirements");
                    return;
                }
                else if (validateMail($scope.mailReg) !== true) {
                    $window.alert("Invalid mail address");
                }
                newUser();
            };

            var newUserSuccess = function(responseData){
                if(responseData.data.status == "error"){
                    $rootScope.registered = false;
                    $scope.hasUsername = false;
                    $location.url('/login');
                }
                else{
                    $scope.hasUsername = true;
                    $location.url('/login');
                }
            };

            var newUserError = function(error){
                $window.alert("An error has ocurred during the execution");
                $location.url('/login');
            };

            var newUser = function () {
                var data = JSON.stringify({
                    "username": $scope.userReg,
                    "password": $scope.passReg
                });
                $http.post($rootScope.RCURL+"/loginAPI/v1/newUser",data,$rootScope.requestConfig).then(newUserSuccess,newUserError);
            };

            function validateUsername(username){
                if (!username || username.length > 15 || username.length < 5) return false;
                return /^\w+$/.test(username); //a-zA-z0-9
            }

            function validatePassword(password){
                if (!password || password.length > 20 || password.length < 6) return false;
                return /^\w+$/.test(password);
            }

            function validateMail(mail){
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(mail);
            }

            $scope.changeHasUsername = function(){
                $scope.hasUsername = !$scope.hasUsername;
            };
});
