'use strict';

angular.module('raceConditions')
    .controller('menuController',
        function menuController($http, $scope, $rootScope, $window, $location) {

            $rootScope.selectedTable=false;

            var init = function () {
                if ($rootScope.token === null) {
                    $window.alert("You need to login first in order to see your created tables");
                    $location.url('/login');
                }
                else {
                    getUserTables();
                }
            };

            init();

            var getUserTablesSuccess = function(responseData){
                if(responseData.data.status == "error"){
                    $location.url('/login');
                }
                else{
                    $scope.tables = responseData.data.ret;
                }
            };

            var getUserTablesError = function(error){
                $window.alert("An error has ocurred during the execution");
                $location.url('/login');
            };

            var getUserTables=function(){
                var data={};
                $http.post($rootScope.RCURL+"/tableAPI/v1/getUserTables",data,$rootScope.requestConfig).then(getUserTablesSuccess,getUserTablesError);
            };

            $scope.loadTable = function(tableKey) {
                $rootScope.selectedTable=true;
                $rootScope.changeActive(0);
                $rootScope.tableKey = tableKey;
                $location.url('/table/modifyTable');
                $rootScope.table = true;
            };


            $scope.newTable={
                tableName:"",
                columnNames:[""],
                columnTypes:[""]
            };

            $scope.addNewAttribute = function(){
                $scope.newTable.columnNames.push("");
                $scope.newTable.columnTypes.push("");
            };

            $scope.delNewAttribute = function(){
                if($scope.newTable.columnNames.length != 1){
                    $scope.newTable.columnNames.pop();
                    $scope.newTable.columnTypes.pop();
                }
            };

            $scope.attrTypes = ["Integer","Double","Date","String","Boolean"];

            var createTableSuccess = function(responseData){
                if(responseData.data.status == "error"){
                    $rootScope.registered = false;
                    $location.url('/login');
                }
                else{
                    $scope.newTable={
                        tableName:"",
                        columnNames:[""],
                        columnTypes:[""]
                    };
                    init();
                }
            };

            var createTableError = function(error){
                $window.alert("An error has ocurred during the execution");
                $location.url('/login');
            };

            $scope.createTable = function () {
                $http.post($rootScope.RCURL+"/tableAPI/v1/createTable",$scope.newTable,$rootScope.requestConfig).then(createTableSuccess,createTableError);
            };
        });