/**
 * Created by: leafchild
 * Date: 2/19/16
 * Time: 19:02
 */
'use strict';
var app = angular.module('aGame', ['ngResource', 'ui.router', 'ui.bootstrap', 'ngAside', 'ngTagsInput']);
app.config(routerConfig).directive('navbar', navbar).constant('baseURL', 'http://localhost:3000/');
/** @ngInject */
function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    // the known route, with missing '/' - let's create alias
    $locationProvider.html5Mode(true);
    $stateProvider.state('auth', {
        url: '/',
        templateUrl: 'app/partials/auth.html',
        controller: 'LoginController',
        controllerAs: 'auth'
    }).state('main', {
        url: '/main',
        templateUrl: 'app/partials/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    }).state('login', {
        url: '/login',
        templateUrl: 'app/partials/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
    }).state('signup', {
        url: '/signup',
        templateUrl: 'app/partials/signup.html',
        controller: 'LoginController',
        controllerAs: 'signup'
    });
}
app.run(['$state', '$rootScope', '$location', 'authService', function($state, $rootScope, $location, authService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            if (fromState.url === '^') {
                if (authService.isLoggedIn())
                    $state.go('main');
                else {
                    authService.userStatus().get().$promise.then(function(response) {
                        //Add item to the collection of items
                        authService.setLoggedIn(response.status);
                        if (!authService.isLoggedIn()) $state.go('auth');
                        else $state.go('main');
                    }, function(response) {
                        vm.message = "Error: " + response.status + " " + response.statusText;
                    });
                }
        }
    });

}]);
/** @ngInject */
function navbar() {
    return {
        restrict: 'E',
        templateUrl: 'app/partials/navbar.html',
        controller: 'MainController',
        controllerAs: 'vm',
        bindToController: true
    };
}