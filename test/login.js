/**
 * Created by: leafchild
 * Date: 5/10/16
 * Project: a_game
 */

'use strict';

describe('LoginController', function () {

    var login,
        scope,
        newUser,
        status,
        $httpBackend;

    // load the controller's module
    beforeEach(module('aGame'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        
        newUser = {name: 'Test user', password: '123'};
        
        $httpBackend = $injector.get('$httpBackend');
        
        status = $httpBackend.when('GET', 'http://localhost:3000/status').respond({
            status: true
        });
        
        scope = $rootScope.$new();
        login = $controller('LoginController', {
            $scope: scope,
        });

    }));


    it('LoginController to be defined', function () {
        
        expect(login).toBeDefined();

    });

    it('should sign up a user', function () {
        
        // post
        //should return status 200 and status: 'Registration successful!'
        $httpBackend.expectPOST('http://localhost:3000/signup', newUser).respond(201, {
            status: 'Registration successful!'
        });
         
        login.signup(newUser);
        $httpBackend.flush();
        
        expect(login.result.status).toEqual('Registration successful!');
        
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should allow to login for existing user', function () {

        //post
        //user user is unknown or wrong password - thrown 401
        //else return 200 and status: 'Login successful!'
        $httpBackend.expectPOST('http://localhost:3000/login', newUser).respond(200, {
            status: 'Login successful!'
        });
        
        login.login(newUser); 
        $httpBackend.flush();
        
        expect(login.result.status).toEqual('Login successful!'); 
        
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        
    });

});
