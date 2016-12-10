'use strict';

angular.module('raceConditions')
    .controller('tablePermissionsController', function tablePermissions($scope, $rootScope, $window, $location, $http) {
            var allUsers = [];
            var allKeys = [];
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
                    xhttp.open("POST", $rootScope.CURL+"tableAPI/v1/getTableInfo");
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
                xhttp.open("POST", $rootScope.RCURL+"/usersAPI/v1/getAllUsers");
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.setRequestHeader("cache-control", "no-cache");
                xhttp.send(data);
            }
            init2();
            function permisos(permiso, tipo, userKey) {
                var URL2;
                var data = {"tableInfoKey": $rootScope.tableKey.toString()};
                if (tipo === "add") {
                    URL2 = "/addUserPermission";
                }
                else {
                    URL2 = "/removeUserPermission";
                }
                data.permission = permiso;
                data.userId = userKey;
                JSON.stringify(data);
                var httpconfig = {
                    headers: { 'Content-Type': 'application/json',
                        'accessToken':$rootScope.accessToken
                    }
                };
                $http.post($rootScope.RCURL+"/tableAPI/v1"+URL2,data,httpconfig).
                    then(getUserTablesSuccess,getUserTablesError);
            }
            $scope.addRead = function(user) {
                permisos("read", "add", allKeys[allUsers.indexOf(user)]);
            }
            $scope.remRead = function(user) {
                permisos("read", "rem", allKeys[allUsers.indexOf(user)]);
            }
            $scope.addWrite = function(user) {
                permisos("write", "add", allKeys[allUsers.indexOf(user)]);
            }
            $scope.remWrite = function(user) {
                permisos("write", "rem", allKeys[allUsers.indexOf(user)]);
            }
            var getUserTablesSuccess = function(responseData){
                console.log(responseData.data);
                if(responseData.data.status == "error"){
                    $rootScope.registered = false;
                    $location.url('/login');
                }
                else{
                    init();
                }
            }
            var getUserTablesError = function () {}
    });