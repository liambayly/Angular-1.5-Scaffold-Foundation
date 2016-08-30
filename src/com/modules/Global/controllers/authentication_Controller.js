//This is the Controller for the login process this process brings the service information (Login info)
//Then it takes it and sets the credentials and clears the credentials
'use strict';


angular.module('myApp.module.Global.Authentication.Controller', ['ngRoute',// jshint ignore:line
                                                                 'myApp.module.Global.Authentication.Factory',
                                                                 'myApp.module.Sales.Person.Factory',
                                                                 'myApp.module.Store.Cart.Factory',
                                                                 'myApp.module.Store.Main.Factory',
                                                                 'myApp.module.Store.Wishlist.Factory'])


.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
            controller: 'LoginController',
            templateUrl: 'com/modules/Global/views/login.html',
            hideMenus: true,
            protectedArea: false,
            clearFoundation: true,
            title: 'Login',
            menuGroup: 'Login',
            description: 'This is the Description of the Login page',
            keywords: 'Login,Authentication',
            breadcrumbList: [{view: '/',title:'Home'},{view: '/login', title: 'Login Main'}]
      });
    }])

.controller('LoginController',// jshint ignore:line
    ['$scope', '$rootScope', 'FoundationApi', '$location', 'AuthenticationService', 'SalesPersonFactory', 'CartFactory', 'StoreFactory', 'WishlistFactory',
    function ($scope, $rootScope, FoundationApi, $location, AuthenticationService, SalesPersonFactory, CartFactory, StoreFactory, WishlistFactory) {
        // reset login status
        //AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, $scope.rememberme, function(response) {
                
                $scope.user = response.data[0];
                
                if($scope.user.isauth) {
                    $rootScope.authkey = $scope.user.authkey;
                    $rootScope.salesRepId = $scope.user.salesrepid;
                    $rootScope.userEmail = $scope.user.email;
                    AuthenticationService.SetCredentials($scope.user, $scope.rememberme);
                    SalesPersonFactory.getSalesPerson(function(dataResponse) {
                        $rootScope.globals.salesPerson = dataResponse.data[0];
                    });
                    CartFactory.getCart(function(dataResponse) {
                        $rootScope.globals.shoppingCart = dataResponse.data;
                        
                        
                    });
                    StoreFactory.getRecentlyViewed(function(dataResponse) {
                       $rootScope.recentlyViewed = dataResponse.data;
                    });   
                    
                    WishlistFactory.list(function(dataResponse) {
                        $scope.wishLists = dataResponse.data;
                    });
                    
                    $scope.username = '';
                    $scope.password = '';
                    FoundationApi.closeActiveElements();
                    $location.path('/');
                    
                }else {
                    $rootScope.loginErrorFlag = true;
                    $rootScope.loginError = $scope.user.retmessage;
                    $scope.dataLoading = false;
                }
                
            });
            
            
            
            return $rootScope;
        };
        
        $scope.logout = function () {
            
            AuthenticationService.ClearCredentials();
			$location.path('/loginPage');
        };
    }]);