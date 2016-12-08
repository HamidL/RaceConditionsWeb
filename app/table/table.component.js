'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('raceConditions').
component('formTable', {
    templateUrl:'table/table.view.html',
    controller: function tableController($scope,$rootScope,$timeout,$http) {
        $rootScope.accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ2h6Zm1oc2JXMW1aM0lSQ3hJRVZYTmxjaGlBZ0lDQS1NS0VDZ3ciLCJleHAiOjE0ODEyNTk5NTh9.JpghpJY_ApcO2VCNcvV9Z6Qy3AU2ir8ns5UGqdgaWiLM1t6WIpwAWLPLcwVWPQnc6XRZhiVSLGTuA1Z2lyQF1A";
        var timer;
        $scope.count = 0;
        var actTable = function(){
            timer = $timeout(actTable,5000);
            getTableAsync();
            $scope.count += 1;
        }
        timer = $timeout(actTable,5000);

        var getTableAsync= function () {
            $scope.done=true;
            var data = JSON.stringify({
                "tableInfoKey": "aghzfmhsbW1mZ3IWCxIJVGFibGVJbmZvGICAgICZ0oUKDA"
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    $scope.done=false;
                    console.log(this.responseText);
                    var JSONResponse = JSON.parse(this.responseText);
                    $scope.table = JSONResponse.ret;
                }
            });

            xhr.open("POST", "https://hlmmfg.appspot.com/_ah/api/tableAPI/v1/getTable");
            xhr.setRequestHeader("accesstoken",  $rootScope.accessToken);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("cache-control", "no-cache");

            xhr.send(data);
        }


        getTableAsync();
        getTableAsync();

        //$scope.table = getTable();

        var inputChangedPromise;
        $scope.inputChanged = function(){

            $timeout.cancel(timer);
            if(inputChangedPromise){
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout(updateValues,3000);
            // timer = $timeout(actTable,5000);
        }

        $scope.pene;

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

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", "https://hlmmfg.appspot.com/_ah/api/tableAPI/v1/modifyRow");
            xhr.setRequestHeader("accesstoken",  $rootScope.accessToken);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("cache-control", "no-cache");

            xhr.send(data);
        }

            $scope.eEditable= -1;
            $scope.eElement;
            $scope.model={};
            $scope.editing = function (id, index) {
                $scope.id =id;
                $scope.index =index;
                $scope.eEditable = index;
            }
        }
    })
