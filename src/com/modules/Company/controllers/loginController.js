//This is the home controller that simply sets a message and returns it to the view.
'use strict';

angular.module('myApp.module.Company.Login.Controller', ['ngRoute', // jshint ignore:line
																												'myApp.module.Global.Message.Factory'])

.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/loginPage', {
						controller: 'LoginPageController',
						templateUrl: 'com/modules/Company/views/login.html',
						hideMenus: false,
						protectedArea: false,
						clearFoundation: true,
						title: 'Login to CPORTAL',
						menuGroup: 'Home',
						description: 'This is the page to login to cportal',
						keywords: 'Home,Homey',
						breadcrumbList: [{view: '/',title:'Home'}]
			});
		}])


.controller('LoginPageController',// jshint ignore:line
		['$scope', '$rootScope', '$location' , 'MessageFactory','FoundationApi',
		function ($scope, $rootScope, $location, MessageFactory,FoundationApi) {

			$scope.message = 'This is the Home page message from the controller';
            
            //This automatically opens the login box on the cportal to allow users to login when they come to here logged out.
            FoundationApi.publish('signIn', 'toggle');
            

			
			//This gets the Initial Error Message
			MessageFactory.getErrorMessage(function(dataResponse) {
					$scope.globalErrorMessage = dataResponse.data;
					if(dataResponse.data.Active === 'true'){
							 $location.path('/error');
					}
					$rootScope.globalErrorMessage = dataResponse.data;
			});

			//This gets the Maintenance  Message
			MessageFactory.getMaintenanceMessage(function(dataResponse) {
					$scope.globalMaintenanceMessage = dataResponse.data;
					$rootScope.globalMaintenanceMessage = dataResponse.data;
					if(dataResponse.data.Active === 'true'){
							 $location.path('/maintenance');
					}
			});

			//This gets the System  Message
			MessageFactory.getSystemMessage(function(dataResponse) {
					$scope.globalSystemMessage = dataResponse.data;
			});


		}]);
