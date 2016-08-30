'use strict';

angular.module('myApp.module.Store.MyPriceList.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/mypricelist', {
            controller: 'mypricelistController',
            templateUrl: 'com/modules/Store/views/mypricelist.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'My Price List',
            menuGroup: 'Store',
            description: 'This is the My Price List Page',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/mypricelist', title: 'My Price List'}]
      });
    }])


    .controller('mypricelistController', ['$scope', function($scope) {
        $scope.message = 'This is the Order History Page';
    }]);