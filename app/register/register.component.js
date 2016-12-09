'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions')
    .controller('registerController',
        function registerController($scope, $timeout, $http, $rootScope, $window,$location) {

            var loginSuccess = function(responseData){
                console.log("loginSuccess");
                console.log(responseData.data);
                if(responseData.data.status == "error"){
                    $rootScope.registered = false;
                    $location.url('/login');
                }
                else{
                    //Piensa a quitarlo
                    $rootScope.accessToken = responseData.data.ret.accesToken;

                    $rootScope.requestConfig = {
                        headers: { 'Content-Type': 'application/json',
                            'accessToken':responseData.data.ret.accesToken
                        }
                    };

                    $timeout(function(){
                        $location.url('/table');
                        $rootScope.registered = true;
                    },3000);

                }
            }

            var loginError = function(error){
                console.log("loginError");
                console.log(error);
            }

            var login = function () {
                var data = JSON.stringify({
                    "username": $scope.name,
                    "password": $scope.password
                });
                $http.post("https://hlmmfg.appspot.com/_ah/api/loginAPI/v1/login",data,$rootScope.requestConfig).then(loginSuccess,loginError);
            }

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
            }

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

            var init = function () {
                $rootScope.registered = false;
            };
            init();
});
