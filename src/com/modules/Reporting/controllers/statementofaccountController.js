'use strict';

angular.module('myApp.module.Reporting.StatementOfAccount.Controller', ['ngRoute'])// jshint ignore:line
    

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/statementofaccount', {
            controller: 'reportingsoaController',
            templateUrl: 'com/modules/Reporting/views/statementofaccount.html',
            hideMenus: true,
            protectedArea: true,
            clearFoundation: true,
            title: 'Reporting- Statement of Accounts',
            menuGroup: 'Home',
            description: 'This is the Statement of Accounts',
            keywords: 'error,danger,thiserror',
            breadcrumbList: [{view: '/', title: 'Home'}, {view: '/', title: 'Reporting'}, {view: '/statementofaccount', title: 'Statement of Account'}]
      });
    }])


    .controller('reportingsoaController', ['$scope', function($scope) {
        $scope.message = 'This is the Statement of Account!';
    }]);