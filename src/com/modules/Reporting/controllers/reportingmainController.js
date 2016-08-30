'use strict';

angular.module('myApp.module.Reporting.Main.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/reportmain', {
            controller: 'reportingmainController',
            templateUrl: 'com/modules/Reporting/views/main.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Reporting- Main',
            menuGroup: 'Home',
            description: 'This is the reporting main page',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/reportmain', title: 'Reporting'}]
      });
    }])


    .controller('reportingmainController', ['$scope', function($scope) {
        $scope.message = 'This is the Statement of Account!';
    }]);