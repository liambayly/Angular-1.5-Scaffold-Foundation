//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Store.Main.Factory', [])// jshint ignore:line

.factory('StoreFactory',// jshint ignore:line
    ['$rootScope','$http','$filter',
    function ($rootScope,$http,$filter) {
        var service = {};
        
            $rootScope.serviceMessage = 'This is the Store Factory';
            //http call configuration sets
            var http = {
                get: function(url, successCallback, errorCallback){
                    //setting defaults
                    successCallback = successCallback || function(){};
                    errorCallback = errorCallback || function(){};
                    //making http call
                    $http({
                        method: 'GET',
                        url: url
                    })
                    .success(successCallback)
                    .error(errorCallback);
                }
            };
        
        
            service.getRecentlyViewed = function (callback) {
                 $http({
                        method: 'GET',
                        url: '/r/Products/recentlyViewed.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callback(data);
                    }).error(function(){
                        //alert('error');// jshint ignore:line
                    });
            };

        
         return service;
    }]);



