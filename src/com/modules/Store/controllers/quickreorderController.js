'use strict';

angular.module('myApp.module.Store.QuickReOrder.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/quickreorder', {
            controller: 'quickReorderController',
            templateUrl: 'com/modules/Store/views/quickreorder.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Quick Reorder',
            menuGroup: 'Store',
            description: 'This is the Quick Reorder',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/store', title: 'Store'}, {view: '/quickreorder', title: 'Quick ReOrder'}]
      });
    }])


    .controller('quickReorderController', ['$scope', function($scope) {
        $scope.message = 'This is the Quick ReOrder Page';
    }]);