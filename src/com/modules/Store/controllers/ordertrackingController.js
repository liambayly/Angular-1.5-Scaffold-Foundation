'use strict';

angular.module('myApp.module.Store.OrderTracking.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/ordertracking', {
            controller: 'ordertrackingController',
            templateUrl: 'com/modules/Store/views/ordertracking.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Order Tracking',
            menuGroup: 'Store',
            description: 'This is the Order Tracking Page',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/ordertracking', title: 'Order Tracking'}]
      });
    }])


    .controller('mypricelistController', ['$scope', function($scope) {
        $scope.message = 'This is the Order Tracking Page';
    }]);