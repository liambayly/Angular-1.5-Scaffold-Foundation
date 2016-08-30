//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Vendors.Main.Factory', [])// jshint ignore:line

.factory('VendorFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};
            $rootScope.serviceMessage = 'This is the Message from the Vendor Factory';
        
            service.getNumberVendors = function (callbackFunc) {
                
               $http({
                        method: 'GET',
                        url: '/r/Vendors/numberVendor.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        //alert('error');// jshint ignore:line
                    });
            };
        
        service.getAllVendors = function (callbackFunc) {
                $http({
                        method: 'GET',
                        url: '/r/Vendors/allVendors.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        //alert('error');// jshint ignore:line
                    });
            };
        
        
         return service;
    }]);