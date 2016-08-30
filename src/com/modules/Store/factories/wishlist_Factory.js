//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Store.Wishlist.Factory', [])// jshint ignore:line

.factory('WishlistFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};
        
            $rootScope.serviceMessage = 'This is the Wishlist Factory';

        
            //List the Users Wishlists 
            service.list = function (callbackFunc) {
                $http({
                        method: 'GET',
                        url: '/r/Store/wishlists.json'
                     }).success(function(data){
                        // With the data succesfully returned, call our callback
                        callbackFunc(data);
                    }).error(function(){
                        //alert('error');// jshint ignore:line
                    });
            };
        
         return service;
    }]);