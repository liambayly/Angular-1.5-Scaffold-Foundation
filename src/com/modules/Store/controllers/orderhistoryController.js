'use strict';

angular.module('myApp.module.Store.OrderHistory.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/orderhistory', {
            controller: 'orderhistoryController',
            templateUrl: 'com/modules/Store/views/orderhistory.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Order History',
            menuGroup: 'Store',
            description: 'This is the Order History',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/orderpad', title: 'Order History'}]
      });
    }])


    .controller('orderhistoryController', ['$scope', function($scope) {
        $scope.message = 'This is the Order History Page';
    }]);