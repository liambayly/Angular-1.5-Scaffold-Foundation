//This is the example service that shows how to setup and utilize a static service to allow for front end development. 
//This system is very simple and basically returns data. 
'use strict';


angular.module('myApp.module.Recalls.Factory', [])// jshint ignore:line

.factory('RecallsFactory',// jshint ignore:line
    ['$rootScope','$http',
    function ($rootScope,$http) {
        var service = {};

            $rootScope.serviceMessage = 'This is the Recall Front Page Factory';

            //This is a reuseable http caller
            function urlGet (url, callback){
                $http({
                        //HTTP Call Settings
                        method: 'GET',
                        url: url
                     })
                .success(function(data){
                    callback(data);
                })
                .error(function(){
                });
            }

            /*
                This function will get all or any number of recalls you want.
                .get(func) will get all and run the callback func
                .get(23,24,func) will get recall id 23 and 24 and run the callback 
                    func passing each object in an array in the same order
                    func([23,24])

            */

            service.getExtended = function(id, callback){
                urlGet('/r/recalls/listrecalls.json', callback);
            };

            service.get = function () {
                //getting parameters, the last one is the user callback the others are id values
                var idList = Array.prototype.slice.call(arguments);
                var userCallback = idList.pop();

                //holds the auth key so we don't need to reference the larger scope more then once
                var authkey = $rootScope.authkey;

                //if the user only placed in a callback
                if(!idList.length){
                    //Pull all recalls
                    urlGet('/r/recalls/listrecalls.json',userCallback);
                    
                }
                //if the user placed in ids with the callback
                else{
                    //The IIFE is to create a function scope to prevent vars bleeding into other parts of the function
                    (function(){
                        //This holds the url results 
                        var urlResults = [];

                        urlGet('/r/recalls/listrecalls.json', function self(data){
                            //push data into the url Results
                            urlResults.push(data);
                            //If we still have items in the list run another call with the next item in the list
                            if(idList.length){
                                urlGet('/r/recalls/listrecalls.json' , self);
                            }
                            //If all results are collected run the user callback with all results
                            else{
                                userCallback(urlResults);
                            }
                        });

                    })();
                }
            };
        
         return service;
    }]);

