'use strict';

angular.module('myApp.module.Store.OrderPad.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/orderpad', {
            controller: 'orderpadController',
            templateUrl: 'com/modules/Store/views/orderpad.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Order Pad',
            menuGroup: 'Store',
            description: 'This is the Order Pad',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/orderpad', title: 'Order Pad'}]
      });
    }])


    .controller('orderpadController', ['$scope', function($scope) {
        $scope.message = 'This is the Order Pad Page';
    }]);