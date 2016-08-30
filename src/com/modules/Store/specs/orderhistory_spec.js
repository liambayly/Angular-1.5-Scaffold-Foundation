//This describes the test you are running and will be used when a test fails , this will display as the item where it fails, 
//I use a dot notation to know the location of the module I am testing 
describe('Unit: myApp.module.Store.OrderHistory.Controller', function() {
    
    //This is the module you are testing in this case we are looking at the about module which is comprised of everything within the module folder (services/Controllers)
    beforeEach(module('myApp.module.Store.OrderHistory.Controller'));
        //Here we declare what items are required for testing , in this case its a controller and the scope of variables that we will be testing. 
        var mypricelistController,
        scope;
    
        //Here we declare the controller and pass the rootscope and controller mock to it to allow it to find and test the controller in the module
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            mypricelistController = $controller('orderhistoryController', {
                $scope: scope
            });
        }));
    
    
    
        //Now that we have declared what we are looking for we begin the test cases this are will house all the test cases for this module
    
        //First test we run is looking for the scope.message variable which is set in the controller and ensure that it is set and returning what we set it as. 
        it('Testing scope.message message is "This is the Order History Page"', function () {
            expect(scope.message).toEqual("This is the Order History Page");
        });
    
    
        //Second we test the route module, this allows us to ensure that the routing information is passing what we expect to see for the about route. 
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['/orderhistory'].controller).toBe('orderhistoryController');
          expect($route.routes['/orderhistory'].templateUrl).toEqual('com/modules/Store/views/orderhistory.html');
          expect($route.routes['/orderhistory'].hideMenus).toBe(true);
          expect($route.routes['/orderhistory'].protectedArea).toBe(true);
          expect($route.routes['/orderhistory'].title).toBe('Order History');
          expect($route.routes['/orderhistory'].description).toBe('This is the Order History');
          expect($route.routes['/orderhistory'].keywords).toBe('error,danger,thiserror');

        }));

});