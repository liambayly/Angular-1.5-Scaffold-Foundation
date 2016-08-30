'use strict';

angular.module('myApp.module.Store.PurchaseByBrand.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/purchasebybrand', {
            controller: 'purchasebybrandController',
            templateUrl: 'com/modules/Store/views/purchasebybrand.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Purchase By Brand',
            menuGroup: 'Store',
            description: 'This is the Purchase By Brand Page',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/purchasebybrand', title: 'Purchase By Brand'}]
      });
    }])


    .controller('purchasebybrandController', ['$scope', function($scope) {
        $scope.message = 'This is the Purchase By Brand Page';
    }]);