'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('raceConditions').controller('tableRowController', function tableController($location,$scope,$rootScope,$timeout,$interval,$http) {
        //INTERVAL
        var init = function (){
            if(!$rootScope.registered){
                $location.url('/login');
            }
        }
        init();

        var timer;
        $scope.count = 0;
        timer = $interval(getTableAsync,2500);

        var getTableSuccess = function(responseData){
            $scope.done=false;
            console.log("getTableSuccess");
            console.log(responseData.data);
            if(responseData.data.status == "error"){
                $rootScope.registered = false;
                $location.url('/login');
            }
            $scope.table = responseData.data.ret;
        }

        var getTableError = function(error){
            console.log("getTableError");
            console.log(error);
        }

        var getTableAsync= function () {
            var data = JSON.stringify({
                "tableInfoKey": $rootScope.tableKey
            });
            $http.post($rootScope.RCURL+"/tableAPI/v1/getTable",data,$rootScope.requestConfig).then(getTableSuccess,getTableError);
        }
        getTableAsync();

        var inputChangedPromise;
        $scope.inputChanged = function(){
            $interval.cancel(timer);
            if(inputChangedPromise){
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout(updateValues,1000);
        }

        var updateValuesSuccess = function(responseData){

            console.log("updateValuesSuccess");
            console.log(responseData.data);
            if(responseData.data.status == "error"){
                $rootScope.registered = false;
                $location.url('/login');
            }
            timer = $interval(getTableAsync,2500);
        }

        var updateValuesError = function(error){
            console.log("updateValuesError");
            console.log(error);
        }

        var  updateValues = function(){
            var data = JSON.stringify({
                "tableInfoKey": $scope.table.tableInfoKey,
                "columnKey": $scope.id,
                "columnNames": [
                    $scope.table.columnNames[$scope.index]
                ],
                "columnValues": [
                    $scope.model[$scope.id + $scope.index]
                ]
            });
            $http.post($rootScope.RCURL+"/tableAPI/v1/modifyRow",data,$rootScope.requestConfig).then(updateValuesSuccess,updateValuesError);
        }

        $scope.eEditable= -1;
        $scope.eElement;
        $scope.model={};
        $scope.editing = function (id, index) {
            $scope.id =id;
            $scope.index =index;
            $scope.eEditable = index;
        }
    });
