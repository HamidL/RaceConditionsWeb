'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions').
  component('formRegister', {
    templateUrl:'register/register.view.html',
    controller: function registerController($scope) {
        $scope.notRegistered=false;

        $scope.login = function (){
            validateUsername($scope.name);

            var loginData = {
                "username": $scope.username,
                "password": $scope.password
            };

            //Así es como se hace una llamada asíncrona
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    var response = JSON.stringify(this.responseText);

                }
                else{
                    console.log(response);
                }
            };
            xhttp.open("POST", URL+"/login");
            xhttp.send(loginData);
        }

        $scope.create = function (){

        }

        function validateUsername(username){
            if (username.length > 15 || username.length < 5) return false;
            return /^\w+$/.test(username); //a-zA-z0-9
        }

        function validatePassword(password){
            if (password.length > 20 || password.length < 6) return false;
            return /^\w+$/.test(password);
        }
        function validateMail(mail){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(mail);
        }
    }
  });
