'use strict';

angular.module('raceConditions')
    .controller('menuController',
        function menuController($http, $scope, $rootScope, $window, $location) {
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
                columnNames:[""],
                columnTypes:[""]
            };

            $scope.addNewAttribute = function(){
                $scope.newTable.columnNames.push("");
                $scope.newTable.columnTypes.push("");
            }

            $scope.delNewAttribute = function(){
                if($scope.newTable.columnNames.size == 1){
                    $scope.newTable.columnNames.pop();
                    $scope.newTable.columnTypes.pop();
                    addNewAttribute();
                }
            }

            $scope.attrTypes = ["Integer","Double","Date","String","Boolean"];

            var createTableSuccess = function(responseData){
                console.log("createTableSuccess");
                console.log(responseData.data);
                if(responseData.data.status == "error"){
                    $rootScope.registered = false;
                    //$location.url('/login');
                }
                else{
                    $scope.newTable={
                        tableName:"",
                        columnNames:[""],
                        columnTypes:[""]
                    };
                    init();
                }
            }

            var createTableError = function(error){
                console.log("createTableError");
                console.log(error);
            }

            $scope.createTable = function () {
                $http.post("https://hlmmfg.appspot.com/_ah/api/tableAPI/v1/createTable",$scope.newTable,$rootScope.requestConfig).then(createTableSuccess,createTableError);
            };
        });