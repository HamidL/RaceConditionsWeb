'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('raceConditions').controller('tableColController', function tableController($rootScope,$scope,$interval,$location,$http) {
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
        $http.post("https://hlmmfg.appspot.com/_ah/api/tableAPI/v1/getTable",data,$rootScope.requestConfig).then(getTableSuccess,getTableError);
    };
    getTableAsync();

    $scope.newRowColumnValues=[];

    var addNewRowSuccess= function(responseData){
        console.log("addNewRowSuccess");
        console.log(responseData.data);
        if(responseData.data.status == "error"){
            $rootScope.registered = false;
            $location.url('/login');
        }
        getTableAsync();
    }


    var addNewRowError = function(error){
        console.log("getTableError");
        console.log(error);
    }

    $scope.addNewRow = function(){
        var data ={
            "tableInfoKey": $rootScope.tableKey,
            "columnNames":[],
            "columnValues":[]
        };
        for(var i = 0; i < $scope.newRowColumnValues.length; ++i){
            if($scope.newRowColumnValues[i] != null){
                data.columnNames.push($scope.table.columnNames[i]);
                data.columnValues.push($scope.newRowColumnValues[i]);
            }
        }
        $http.post("https://hlmmfg.appspot.com/_ah/api/tableAPI/v1/addNewRow",data,$rootScope.requestConfig).then(addNewRowSuccess,addNewRowError);

    }

});
