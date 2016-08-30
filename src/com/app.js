'use strict';
//This is the only item you need to edit within the app.js this will change it application wide 
//This will also allow you to use 'app' to tie it to the application and it will inherit everything from the application core
var appName = 'ScaffoldSeed';

//Define the Application in one spot and have an alias that doesn't call all the requirements 
var globalApp = angular.module(appName,[// jshint ignore:line
                                        'foundation',
                                        'ngRoute',
                                        'ngCookies',
                                        'ngNotify',
                                        'ngAnimate',
                                        'ngTouch',
										'angularCharts',
                                        'myApp.module.Company.Home.Controller',
										'myApp.module.Company.Login.Controller',

                                        'myApp.module.Global.400.Controller',
                                        'myApp.module.Global.401.Controller',
                                        'myApp.module.Global.403.Controller',
                                        'myApp.module.Global.404.Controller',
                                        'myApp.module.Global.500.Controller',
                                        'myApp.module.Global.Authentication.Controller',
                                        'myApp.module.Global.Error.Controller',
										'myApp.module.Global.Maintenance.Controller',
                                        'myApp.module.Global.Header.Controller',
                                        'myApp.module.Global.Logout.Controller',
                                        'myApp.module.Global.Message.Factory',

                                        'myApp.module.Global.sessionInjector.Factory',
	
										'myApp.module.Global.Authentication.Factory',
	
										'myApp.module.Global.Profile.Factory',
										'myApp.module.Sales.Person.Factory',
                                        'myApp.module.Store.Cart.Factory',
                                        'myApp.module.Store.Main.Factory',
                                        'myApp.module.Store.Wishlist.Factory',
	
										'myApp.module.Reporting.StatementOfAccount.Controller',
										'myApp.module.Store.QuickReOrder.Controller',
										'myApp.module.Reporting.Main.Controller',
										'myApp.module.Store.OrderPad.Controller',
										'myApp.module.Store.OrderHistory.Controller',
										'myApp.module.Store.MyPriceList.Controller',
										'myApp.module.Store.OrderTracking.Controller',
										'myApp.module.Store.PurchaseByBrand.Controller',
										'myApp.module.Store.PurchaseByCategory.Controller',
										'myApp.module.Test.Main.d3',
										'myApp.module.Company.Graph.Factory'
                                       ]);


//Europaapp is used by items that don't require modules loaded, mostly directives that allow it to be part of the application without the need to log the dependencies needed by the application
//overall
var europaApp = angular.module(appName);// jshint ignore:line


//This is the run command within angular and it houses items that are needed to on running the application
//This is the second function to run after .config in the application instantiation
globalApp.run(['$rootScope', 'FoundationApi', '$location','$cookieStore', '$cookies', '$http', '$timeout', 'MessageFactory', 'ngNotify', 'ProfileFactory', 'AuthenticationService', 'SalesPersonFactory', 'CartFactory', 'StoreFactory', 'WishlistFactory',
    function ($rootScope, FoundationApi, $location, $cookieStore, $cookies, $http, $timeout, MessageFactory, ngNotify, ProfileFactory, AuthenticationService, SalesPersonFactory, CartFactory, StoreFactory, WishlistFactory) {
        
        
        //Setting Global Variables
        $rootScope.authkey = '0';
        $rootScope.salesRepId = '0';
        $rootScope.loginErrorFlag = false;
        $rootScope.loginError = '';
        $rootScope.userEmail = '';
        $rootScope.preLoader = false;
        $rootScope.errorMessageFlag = false;
        $rootScope.maintenanceMessageFlag = false;
        $rootScope.systemMessageFlag = false;
        $rootScope.recentlyViewed = [];
        $rootScope.comparedProducts = [{id: 0,pic:'', name: '', set: false},{id: 0,pic:'', name: '', set: false},{id: 0,pic:'', name: '', set: false}];
        //$rootScope.itemsinCart = 0;
        //$rootScope.totalCart = 0;
        //$rootScope.Cart = [];
        $rootScope.mainNavActive = {};
        $rootScope.wishlistID = '';
		
		//This is the call to set the profile information 
			ProfileFactory.getProfile(function(dataResponse) {
					$rootScope.serverProfile = dataResponse.data[0];
					$rootScope.cportalLink = $rootScope.serverProfile.cportallink;
					$rootScope.ScaffoldLink = $rootScope.serverProfile.ScaffoldLink;

			});
        
        
        //End of the device check-----------------------------
       // FastClick.attach(document.body);
        
        $timeout(function killPreLoader() {
            $rootScope.preLoader = true;
            //There is an issue with the screen flashing on the init load.
            //It flashes as the ng-if and ng-show will not happen until angular and all the modules load. So to hide this we can't use angular.
            //We attached a hide class to the main content to hide the content when the app loads we remove the class so the ng-show will be able to do it's thing
            $('#indexHTMLContent').removeClass('hide');// jshint ignore:line
            $( "#indexHTMLContent" ).fadeIn( 700, function() {// jshint ignore:line
              // Animation complete
            });
            //$( "#indexHTMLLoader" ).fadeOut( "slow", function() {});// jshint ignore:line
        }, 3000);
        
        
        //End the Message Checks
        
		
		$rootScope.loginWToken = function(authKey){
            AuthenticationService.LoginWithToken(authKey, function(response) {
                
                var user = response.data[0];
                
                if(user.isauth) {
                    $rootScope.authkey = user.authkey;
                    $rootScope.salesRepId = user.salesrepid;
                    $rootScope.userEmail = user.email;
                    AuthenticationService.SetCredentials(user, $rootScope.rememberMe);
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
                        $rootScope.wishLists = dataResponse.data;
                    });
                  
                    
                }else {
                    $rootScope.loginErrorFlag = true;
                    $rootScope.loginError = user.retmessage;
                }
                
            });
            
		};
        
        
        // keep user logged in after page refresh
        //This sets the user credentials to the cookieStore allowing the user to stay logged in even after they close the browse
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.rememberMe = $cookies.get('rememberme') || {};
        $rootScope.sso = $cookies.get('sso') || {};
        //console.log('Cookie SSO Record',$cookies.get('sso'));
		//console.log('RootScope Record',$cookieStore.get('globals'));
        if ($rootScope.sso.length) {
			$rootScope.loginWToken($cookies.get('sso'));
            $http.defaults.headers.common['Authorization'] = 'Verification ' + ' Anonymous'; // jshint ignore:line
            globalApp.value('user', {
                authKey: $rootScope.sso
            });
        }
        
        //This is the range function , this is global since it can be used to run an ng-repeat or other item 
        //Using this to allow us to do ng-repeat on a numeric step index. 
        $rootScope.range = function(min, max, step){
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) input.push(i);// jshint ignore:line
            return input;
          };
        
        $rootScope.checkErrorMessage = function(){
            MessageFactory.getErrorMessage(function(dataResponse) {
            $rootScope.errorMessage = dataResponse.data[0];
                if($rootScope.errorMessageFlag === false){
                    if($rootScope.errorMessage.success === 1){
                        $rootScope.errorMessageFlag = true;
                        ngNotify.addType('scaffoldError', 'message__error');
                        ngNotify.set($rootScope.errorMessage.message, {type: 'europaError', position: 'top', html: true, sticky: true, duration: 4000});   
                    }
                }
            });
        };
        
        $rootScope.checkMaintenanceMessage = function(){
            MessageFactory.getMaintenanceMessage(function(dataResponse) {
            $rootScope.MaintenanceMessage = dataResponse.data[0];
                if($rootScope.maintenanceMessageFlag === false){
                    if($rootScope.MaintenanceMessage.success === 1){
                        $rootScope.maintenanceMessageFlag = true;
                        ngNotify.addType('scaffoldMaintance', 'message__maintenance');
                        ngNotify.set($rootScope.MaintenanceMessage.message, {type: 'europaMaintance', position: 'top', html: true, sticky: true, duration: 4000});   
                    }
                }
            });
        };
        
        $rootScope.checkSystemMessage = function(){
            MessageFactory.getSystemMessage(function(dataResponse) {
            $rootScope.SystemMessage = dataResponse.data[0];
                if($rootScope.systemMessageFlag === false){
                    if($rootScope.SystemMessage.success === 1){
                        $rootScope.systemMessageFlag = true;
                        ngNotify.addType('scaffoldSystem', 'message__system');
                        ngNotify.set($rootScope.SystemMessage.message, {type: 'europaSystem', position: 'top', html: true, sticky: true, duration: 4000});   
                    }
                }
            });
        };
        
        
        
        
        //This is the compare object functions that are used in the application to manage the compare system
        
        
        $rootScope.addItemToCompare = function(obj){
            var tmpID = $rootScope.findCompareItemBySet();
            $rootScope.comparedProducts[tmpID].id = obj.productid;
            $rootScope.comparedProducts[tmpID].name = obj.productname;
            $rootScope.comparedProducts[tmpID].pic = obj.picfile;
            $rootScope.comparedProducts[tmpID].set = true;
            return $rootScope.comparedProducts;
        };
        
        $rootScope.removeItemFromCompare = function(id){
            var tmpID = $rootScope.findCompareitem(id);
            $rootScope.comparedProducts[tmpID].id = 0;
            $rootScope.comparedProducts[tmpID].name = '';
            $rootScope.comparedProducts[tmpID].pic = '';
            $rootScope.comparedProducts[tmpID].set = false;
            return $rootScope.comparedProducts;
        };
        
        $rootScope.resetCompareObject = function(){
            $rootScope.comparedProducts = [{id: 0,pic:'', name: '', set: false},{id: 0,pic:'', name: '', set: false},{id: 0,pic:'', name: '', set: false}];
            return $rootScope.comparedProducts;
        };
        
        $rootScope.findCompareitem = function(id){
          var index = -1;
            for(var i = 0, len = $rootScope.comparedProducts.length; i < len; i++) {
                if ($rootScope.comparedProducts[i].id === id) {
                    index = i;
                    break;
                }
            }  
            return index;
        };
        
        $rootScope.findCompareItemBySet = function(){
            var index = -1;
            for(var i = 0, len = $rootScope.comparedProducts.length; i < len; i++) {
                if ($rootScope.comparedProducts[i].set === false) {
                    index = i;
                    break;
                }
            }  
            
            if(index === -1){
                index = 0;
            }
            
            return index;
            
        };
		
		
		
		
		//Add items to the breadcrumb trail, this allows us the ability to append the breadcrumb system link
		$rootScope.appendBreadCrumb = function(view, title){
			$rootScope.breadCrumb = $rootScope.breadCrumb.concat([{view: view,title: title}]);
			return $rootScope.breadcrumb;
		};
        
        
        //End of the compare functions that run the compare object
 
        //Once all of the dependencies are resolved $routeChangeSuccess is fired.
        //This has a few functions that the application uses including setting the active for the menu and the dynamic title
        $rootScope.$on("$routeChangeSuccess", function(event, current, previous){// jshint ignore:line
                //Change page title, based on Route information
                $rootScope.pageTitle = current.$$route.title;
                $rootScope.menuGroup = current.$$route.menuGroup;
                $rootScope.protected = current.$$route.protectedArea;
                $rootScope.metaDescription = current.$$route.description;
                $rootScope.keywords = current.$$route.metaKeywords;
                $rootScope.breadCrumb = current.$$route.breadcrumbList;

                //This handles the FoundationAPI active Elements if it is a new page.
                if(current.$$route.clearFoundation === true && previous !== undefined){
                    //This If is to check the change is not from achoring
                    if(current.originalPath !== previous.originalPath || current.params.id !== previous.params.id){
                        FoundationApi.closeActiveElements();
                    }
                }

                $rootScope.checkErrorMessage();
                $rootScope.checkMaintenanceMessage();
                $rootScope.checkSystemMessage();
                if(current.$$route.protectedArea && !$rootScope.globals.currentUser){
					//console.log('**************************pegged the login check*************************');
					//console.log('SSO rootscope', $rootScope.sso);
					//console.log('Checking Cookie', $cookies.get('sso'));
					//console.log('RootScope Current User', $rootScope.globals.currentUser);
                    $location.path('/loginPage');
                }
                
                /*
                    This handles the mainNavbar highlighting
                    The controller should have either menuGroup="Store" 
                    or an chain in an array menuGroup=['company', 'companyEvents']
                    the string will only highlight the main navbar section but if you want
                    to highlight a deeper set use the array method these names should match
                    with the ng-class assigned to the element in question
                */
                $rootScope.mainNavActive = {};
                if(typeof current.$$route.menuGroup === 'object'){
                    for (var index = 0; index < current.$$route.menuGroup.length; index++) {
                        $rootScope.mainNavActive[current.$$route.menuGroup[index]] = 'mainNav--active';
                    }
                }else if(typeof current.$$route.menuGroup === 'string'){
                    $rootScope.mainNavActive[current.$$route.menuGroup] = 'mainNav--active';
                }

                $rootScope.isActive = function (viewLocation) { 
                    return viewLocation === current.$$route.menuGroup;
                };
        });
        
        
    }]);


//This is the default route all routes are located within the modules thus making them stand alone objects so to speak 
//setting this will change the default location that the spa points to . 
europaApp.config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider',  function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {// jshint ignore:line

    $httpProvider.interceptors.push('sessionInjector');
    
    $routeProvider.otherwise({ redirectTo: '/' });
    $compileProvider.debugInfoEnabled(true); //change this to false for production
    // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode({
        enabled : true,
        requireBase: false
    });
        
    //This is the global interceptor that will handle the 401 error and reload the page 
    $httpProvider.interceptors.push(function ($q) {
        return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                console.log(response);
                return response;
            },
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    //location.reload();
                    //location.path('/401');
                    console.log('401 Error');
                }
                if(rejection.status === 404) {
                    //location.path('/404');
                    console.log('404 error');
                }
                if(rejection.status === 405) {
                    //Put Error Handling Here
                    console.log('405 Error');
                }
                if(rejection.status === 400) {
                    //location.path('/400');
                    console.log('400 Error');
                }
                if(rejection.status === 304) {
                    //Put Error Handling Here
                    console.log('304 Error');
                }
                if(rejection.status === 500) {
                    //location.reload();
                    //location.path('/500');
                    console.log('500 Error');
                }
                return $q.reject(rejection);
            }
        };
    });
    
    //End of the interceptor
    
    
}]);

