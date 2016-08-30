//this is so I don't have to keep creating this
/*
eu-pageName -- Not in cotroller
eu-module
eu-controller
eu-route
eu-message
eu-templateUrl
eu-title
eu-Description
eu-keywords
*/

describe('Unit: eu-module', function() {

    beforeEach(module('eu-module'));

        var RegisterController,
        scope;

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            RegisterController = $controller('eu-controller', {
                $scope: scope
            });
        }));
    
    
        it('Testing scope.message message is "This is the eu-pageName page message from the controller"', function () {
            expect(scope.message).toEqual('eu-message');
        });
    
    
        it('Testing the Route Information in the about Module',
        inject(function ($route) {

          expect($route.routes['eu-route'].controller).toBe('eu-controller');
          expect($route.routes['eu-route'].templateUrl).toEqual('eu-templateUrl');
          expect($route.routes['eu-route'].protectedArea).toBe(false);
          expect($route.routes['eu-route'].title).toBe('eu-title');
          expect($route.routes['eu-route'].description).toBe('eu-Description');
          expect($route.routes['eu-route'].keywords).toBe('eu-keywords');

        }));

});