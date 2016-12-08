'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions').
  component('formRegister', {
    templateUrl:'register/register.view.html',
    controller: function registerController($scope, $rootScope, $window) {
        $scope.notRegistered=false;

        $scope.login = function (){
            if (validateUsername($scope.name) !== true) {
                $window.alert("The username doesn't match the requirements");
                return;
            }
            else if (validatePassword($scope.password) !== true) {
                $window.alert("The password doesn't match the requirements");
                return;
            }
            var loginData = JSON.stringify({
                "username": $scope.name,
                "password": $scope.password
            });

            console.log(loginData);
            //Así es como se hace una llamada asíncrona
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    var response = JSON.stringify(this.responseText);
                    /*if (response.status === "error" && response.ret.errorMessage === "Given token is invalid or has expired") {
                        $scope.changeView = function(){
                            $location.path(register/register.view); //path not hash
                        }
                    }*/
                    var jsonResp = JSON.parse(xhttp.responseText);
                    console.log(JSON.parse(xhttp.responseText));
                    $rootScope.token = jsonResp.ret.accesToken;
                }
                else{
                    console.log(response);
                }
            };
            var URL = "https://hlmmfg.appspot.com/_ah/api/loginAPI/v1";
            xhttp.open("POST", URL+"/login");
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.setRequestHeader("cache-control", "no-cache");
            xhttp.send(loginData);

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

        }

        function switchFunct() {

        }

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
    }
  });
