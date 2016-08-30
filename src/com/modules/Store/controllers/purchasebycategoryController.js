'use strict';

angular.module('myApp.module.Store.PurchaseByCategory.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/purchasebycategory', {
            controller: 'purchasebycategoryController',
            templateUrl: 'com/modules/Store/views/purchasebycategory.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Purchase By Category',
            menuGroup: 'Store',
            description: 'This is the Purchase By Category Page',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/purchasebycategory', title: 'Purchase By Category'}]
      });
    }])


    .controller('purchasebycategoryController', ['$scope', function($scope) {
        $scope.message = 'This is the Purchase By Category Page';
    }]);