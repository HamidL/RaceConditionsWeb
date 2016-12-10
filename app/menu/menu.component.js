'use strict';

angular.module('raceConditions')
    .controller('menuController',
        function menuController($scope, $rootScope, $window, $location) {
            $rootScope.selectedTable=false;
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
                            $scope.tables = jsonResp;
                            $scope.$apply();
                        }
                    };
                    var loginData ="";
                    var URL = "https://hlmmfg.appspot.com/_ah/api/tableAPI/v1";
                    xhttp.open("POST", URL+"/getUserTables");
                    xhttp.setRequestHeader("content-type", "application/json");
                    xhttp.setRequestHeader("cache-control", "no-cache");
                    xhttp.setRequestHeader("accesstoken", $rootScope.accessToken);
                    xhttp.send(loginData);
                }
            };
            init();
            $scope.loadTable = function(tableKey) {
                $rootScope.selectedTable=true;
                $rootScope.changeActive(0);
                $rootScope.tableKey = tableKey;
                $location.url('/table/modifyTable');
                $rootScope.table = true;
            }


            $scope.newTable={
                tableName:"",
                attributes:[
                    {
                        name: "",
                        type: ""
                    }
                ]
            }

            $scope.addNewAttribute = function(){
                var attribute=
                {
                    name: "",
                    type: ""
                };
                $scope.newTable.attributes.push(attribute);
            }

            $scope.delNewAttribute = function(){
                $scope.newTable.attributes.pop();
                if($scope.newTable.attributes.size == 1){
                    $scope.newTable.attributes.push(attribute);
                }
            }

            $scope.attrTypes = ["Integer","Double","Date","String","Boolean"]
        });