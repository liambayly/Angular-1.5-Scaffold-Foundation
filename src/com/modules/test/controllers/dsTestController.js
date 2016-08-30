'use strict';

angular.module('myApp.module.Test.Main.d3', ['ngRoute']) // jshint ignore:line


.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/d3test', {
		controller: 'd3testController',
		templateUrl: 'com/modules/test/views/main.html',
		hideMenus: true,
		protectedArea: false,
		clearFoundation: true,
		title: 'Testing D3',
		menuGroup: 'Home',
		description: 'This is the testing area for the d3 directive ',
		keywords: 'error,danger,thiserror',
		breadcrumbList: [{
			view: '/',
			title: 'Home'
		}, {
			view: '/reportmain',
			title: 'Reporting'
		}]
	});
    }])


.controller('d3testController', ['$scope','GraphFactory', function ($scope, GraphFactory) {
	$scope.message = 'This is the D3 testing page';
	
	
	$scope.chartType = 'bar';
	
	$scope.config = {
    title: 'Products',
    tooltips: true,
    labels: false,
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      //could be 'left, right'
      position: 'right'
    }
  };
	
	
	$scope.config1 = {
		labels: false,
		title: 'Products',
		legend: {
			display: true,
			position: 'left'
		},
		innerRadius: 110,
		outerRadius: 100
	};

	$scope.config2 = {
		labels: false,
		title: 'HTML-enabled legend',
		legend: {
			display: true,
			htmlEnabled: true,
			position: 'right'
		},
		lineLegend: 'traditional'
	};

	
  //This is the Featured Products System
			GraphFactory.getGraphBanners(function(dataResponse) {
					$scope.data = dataResponse.graph[0];
			});
	
	
			GraphFactory.getGraphBanners2(function(dataResponse) {
					$scope.data1 = dataResponse.graph[0];
			});
	
			GraphFactory.getGraphBanners3(function(dataResponse) {
					$scope.data2 = dataResponse.graph[0];
			});

	

    }]);