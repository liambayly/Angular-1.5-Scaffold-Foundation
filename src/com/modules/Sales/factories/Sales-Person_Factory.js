//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Sales.Person.Factory', [])// jshint ignore:line

.factory('SalesPersonFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};
            $rootScope.serviceMessage = 'This is the Message from the Sales Person Factory';

            service.getSalesPerson = function (callback) {
                
                
                
                //var salesURL = '/Mercury/salesRep/READ/'+$rootScope.authkey+'/'+$rootScope.salesRepId;
                //$http({
                //    method: 'GET',
                //    url: salesURL
                //}).success(function(data){
                //    callbackFunc(data);
                //}).error(function(){
                //    //alert('error');// jshint ignore:line
                //});
                
                
                $http({
                        cache: true,
                        method: 'GET',
                        url: '/r/Sales/getSalesPerson.json'
                     }).success(function(data){
                        $rootScope.loginErrorFlag = false;
                        $rootScope.loginError = '';
                        callback(data);
                    }).error(function(){
                       $rootScope.loginErrorFlag = true;
                        $rootScope.loginError = 'There was a problem communicating with the server';
                    });
            };
            
        
        
        
        
            return service;
    }]);