//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Store.Cart.Factory', [])// jshint ignore:line

.factory('CartFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};
        
            $rootScope.serviceMessage = 'This is the Cart Factory';

            service.getCart = function (callbackFunc) {
                $http({
                        method: 'GET',
                        url: '/r/Store/shoppingcart.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        //alert('error');// jshint ignore:line
                    });
            };
        
         return service;
    }]);