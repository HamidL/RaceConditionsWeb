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
                            console.log(jsonResp.readUsersNames);
                            $scope.writeUsersNames = jsonResp.writeUsersNames;
                            console.log(jsonResp.writeUsersNames);
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
        });