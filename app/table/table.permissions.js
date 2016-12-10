'use strict';

angular.module('raceConditions')
    .controller('tablePermissionsController', function tablePermissions($scope, $rootScope, $window, $location) {

            var init = function (){
                if(!$rootScope.registered){
                    $location.url('/login');
                }
            }
            init();

            var jsonResp;
            var init = function () {
                if ($rootScope.token === null) {
                    $window.alert("You need to login first in order to see your created tables");
                }
                else { //el usuario está logueado y tengo su token: cargo sus tablas
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState === 4 && this.status === 200) {
                            var response = JSON.stringify(this.responseText);
                            /*if (response.status === "error" && response.ret.errorMessage === "Given token is invalid or has expired") {
                             $scope.changeView = function(){
                             $location.path(register/register.view); //path not hash
                             }
                             }*/
                            jsonResp = JSON.parse(xhttp.responseText).ret;
                            $scope.readUsersNames = jsonResp.readUsersNames;
                            $scope.writeUsersNames = jsonResp.writeUsersNames;
                            $scope.$apply();
                        }
                    };
                    var tableData = JSON.stringify({"tableInfoKey": $rootScope.tableKey});
                    var URL = "https://hlmmfg.appspot.com/_ah/api/tableAPI/v1";
                    xhttp.open("POST", URL+"/getTableInfo");
                    xhttp.setRequestHeader("content-type", "application/json");
                    xhttp.setRequestHeader("cache-control", "no-cache");
                    xhttp.setRequestHeader("accesstoken", $rootScope.accessToken);
                    xhttp.send(tableData);
                }
            };
            init();
            var init2 = function() {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        var response = JSON.stringify(this.responseText);
                        /*if (response.status === "error" && response.ret.errorMessage === "Given token is invalid or has expired") {
                         $scope.changeView = function(){
                         $location.path(register/register.view); //path not hash
                         }
                         }*/
                        jsonResp = JSON.parse(xhttp.responseText).ret;
                        var allUsers = [];
                        var allKeys = [];
                        var i;
                        for (i = 0; i < jsonResp.length; i+=2) {
                            allUsers.push(jsonResp[i]);
                            allKeys.push(jsonResp[i+1]);
                        }
                        $scope.usernames = allUsers;
                        $scope.keys = allKeys;
                        $scope.$apply();
                    }
                };
                var data = "";
                var URL = "https://hlmmfg.appspot.com/_ah/api/usersAPI/v1";
                xhttp.open("POST", URL+"/getAllUsers");
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.setRequestHeader("cache-control", "no-cache");
                xhttp.send(data);
            }
            init2();
            function permisos(permiso, tipo, userKey) {
                var URL2;
                var data = {"tableInfoKey": $rootScope.tableKey};
                if (tipo === "add") {
                    URL2 = "/addUserPermissions";
                }
                else {
                    URL2 = "/removeUserPermissions";
                }
                data.permission = permiso;
                data.userId = userKey;
                JSON.stringify(data);
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        var response = JSON.stringify(this.responseText);
                        /*if (response.status === "error" && response.ret.errorMessage === "Given token is invalid or has expired") {
                         $scope.changeView = function(){
                         $location.path(register/register.view); //path not hash
                         }
                         }*/
                    }
                };

                var URL = "https://hlmmfg.appspot.com/_ah/api/tableAPI/v1";
                xhttp.open("POST", URL+URL2);
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.setRequestHeader("cache-control", "no-cache");
                xhttp.send(data);
            }
            $scope.addRead = function(user) {
                permisos("")
            }
            $scope.remRead = function(user) {
                console.log(user);
            }
    });