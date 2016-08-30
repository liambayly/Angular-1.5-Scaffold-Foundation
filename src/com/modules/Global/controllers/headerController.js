//This is the home controller that simply sets a message and returns it to the view.
'use strict';

angular.module('myApp.module.Global.Header.Controller', ['ngRoute', // jshint ignore:line
                                                         'foundation',
                                                         'myApp.module.Sales.Person.Factory', 
                                                         'myApp.module.Recalls.Factory',
                                                         'myApp.module.Vendors.Main.Factory',
                                                         'myApp.module.Global.Authentication.Factory',
                                                         'myApp.module.Global.Search.Factory'])


.controller('HeaderController',// jshint ignore:line
    ['$scope', '$rootScope','FoundationApi','SalesPersonFactory', 'RecallsFactory', 'VendorFactory',  'SearchFactory','$location', 'AuthenticationService', 
    function ($scope, $rootScope, FoundationApi, SalesPersonFactory, RecallsFactory, VendorFactory, SearchFactory, $location, AuthenticationService) {
        
      $scope.message = 'This is the Header Message';
      $scope.vendorSearchFlag = false;
      $scope.searchVendor = null;
      $scope.showPassword = false;
      $scope.passwordResetError = false;
      $scope.passwordResetSuccess = false;
      $scope.showUsername = false;
      $scope.UsernameError = false;
      $scope.UsernameSuccess = false;
      $scope.signinPage = true;
      $scope.searchIndex =0;
      $scope.searchWindow = false;
      $scope.searchTrm = '';
      $scope.searchTop = true;
      $scope.searchType = '';
      $scope.searchID = '';
      $scope.searchName = '';
        
        $scope.showVendorSearch = function (){
            
                $scope.vendorSearchFlag = true;


            return $scope.vendorSearchFlag;
        };
        
        $scope.hideVendorSearch = function (){
            
                $scope.vendorSearchFlag = false;


            return $scope.vendorSearchFlag;
        };
        
        $scope.resetVendorSearch = function() {
            $scope.hideVendorSearch();
            $scope.searchVendor = null;
        };
        
        $scope.showResetPassword = function() {
            if($scope.showPassword){
                $scope.showPassword = false;
                $scope.signinPage = true;
            }else{
                $scope.showPassword = true;
                $scope.signinPage = false;
            }
        };
        
        $scope.showUsernameScreen = function() {
            if($scope.showUsername){
                $scope.showUsername = false;
                $scope.signinPage = true;
            }else{
                $scope.showUsername = true;
                $scope.signinPage = false;
            }
        };
        
        $scope.backtoSignIn = function(){
            $scope.passwordResetError = false;
            $scope.passwordResetSuccess = false;
            $scope.showPassword = false;
            $scope.showUsername = false;
            $scope.UsernameError = false;
            $scope.UsernameSuccess = false;
            $scope.signinPage = true;
            $scope.email2 = null;
            $scope.email = null;
        };
        
        
        $scope.resetPassword = function(email) {
              AuthenticationService.forgotPassword(email, function(callback) {
                $scope.passwordResponse = callback.data[0];
                  if($scope.passwordResponse.success === 0){
                       $scope.passwordResetError = true;
                       $scope.passwordResetSuccess = false;
                  }else{
                       $scope.passwordResetError = false;
                       $scope.passwordResetSuccess = true;
                  }
                  
            });
        };
        
        $scope.goToSearchPage = function(searchT){
            $scope.searchWindow = false;
            $scope.search.Term = null;
            $location.path('/SearchListing').search({search: searchT});
        };
        
        $scope.resetUsername = function(email2) {
             AuthenticationService.forgotUsername(email2, function(callback) {
                $scope.usernameResponse = callback.data[0];
                  if($scope.usernameResponse.success === 0){
                       $scope.UsernameError = true;
                       $scope.UsernameSuccess = false;
                  }else{
                       $scope.UsernameError = false;
                       $scope.UsernameSuccess = true;
                  }
                  
            });
        };
        
        $scope.search = function(searchText){
            if(searchText.length >= 3){
                SearchFactory.getResults(searchText, function(callback){
                     $scope.SearchResults = callback; 
                    $scope.searchIndex = 0;
                    $scope.searchWindow = true;
                    $scope.searchTop = true;
                    $scope.searchTrm = searchText;
                    $scope.searchType = '';
                    $scope.searchID = '';
                    $scope.searchName = '';
                });
            }else{
                $scope.searchWindow = false;
            }
        };
        
        $scope.searchProducts = function(searchText, type, id){
                if(type === 'Brand'){
                       SearchFactory.getBrandProducts(id, function(callback){
                             $scope.SearchResults.PRODUCTS = callback.PRODUCTS; 
                            $scope.searchIndex = 0;
                            $scope.searchWindow = true;
                            $scope.searchTrm = searchText;
                            $scope.searchTop = false;
                            $scope.searchType = type;
                            $scope.searchID = id;
                            $scope.searchName = searchText;
                      }); 
                }
            
                if(type === 'Category'){
                    SearchFactory.getCategoryProducts(id, function(callback){
                             $scope.SearchResults.PRODUCTS = callback.PRODUCTS; 
                            $scope.searchIndex = 0;
                            $scope.searchWindow = true;
                            $scope.searchTrm = searchText;
                            $scope.searchTop = false;
                            $scope.searchType = type;
                            $scope.searchID = id;
                            $scope.searchName = searchText;
                      }); 
                }
        };
        
        $scope.setSearchIndex = function(searchIndex, keyword){
            $scope.searchIndex = searchIndex;
            $scope.search.Term = keyword;
        };
        
        $scope.closeSearchWindow = function(){
            $scope.search.Term = null;
            $scope.searchWindow = false;
        };
        
        
        $scope.runSearch = function(){
            
        };
        
        $scope.gotoSalesPerson = function(id){
          $location.path('/salesProfile').search({id: id}); 
        };
        
        
       //This is the Spotlight Banner System
        SalesPersonFactory.getSalesPerson(function(dataResponse) {
            $scope.salesPerson = dataResponse.data;
        });
        
       //This is the Recall Banner System
        RecallsFactory.get(function(dataResponse) {
            $scope.fpRecalls = dataResponse.data;
        });
        

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }]);