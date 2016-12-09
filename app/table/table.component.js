'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('raceConditions').controller('tableController', function tableController($location,$scope,$rootScope,$timeout,$http) {

        var init = function (){
            if(!$rootScope.registered){
                $location.url('/login');
            }
        }
        init();

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
                "tableInfoKey": $rootScope.tableKey
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    $scope.done=false;
                    console.log(this.responseText);
                    var JSONResponse = JSON.parse(this.responseText);
                    if(JSONResponse.status == "error"){
                        $rootScope.registered = false;
                        $location.url('/login');
                    }
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
        });
