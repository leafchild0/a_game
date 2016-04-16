/**
 * Created by: leafchild
 * Date: 2/19/16
 * Time: 19:02
 */

'use strict';

var app = angular.module( 'aGame', [ 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAside', 'ngTagsInput' ] );

app.config( routerConfig )
    .directive( 'navbar', navbar )
    .constant( 'baseURL', 'http://localhost:3000/' );

/** @ngInject */
function routerConfig( $stateProvider, $urlRouterProvider, $locationProvider ){
    $stateProvider
    .state( 'main', {
        url         : '/main',
        templateUrl : 'app/partials/main.html',
        controller  : 'MainController',
        controllerAs: 'main',
        access: {restricted: true}
    } ).state( 'auth', {
        url         : '/',
        templateUrl : 'app/partials/auth.html',
        controller  : 'LoginController',
        controllerAs: 'auth'
    } ).state( 'login', {
        url         : '/login',
        templateUrl : 'app/partials/login.html',
        controller  : 'LoginController',
        controllerAs: 'login'
    } ).state( 'signup', {
        url         : '/signup',
        templateUrl : 'app/partials/signup.html',
        controller  : 'LoginController',
        controllerAs: 'signup'
    } );

    $urlRouterProvider.otherwise( '/' );
    $locationProvider.html5Mode( true );
}

app.run(function ($rootScope, $location, authService) {
    //TODO: Persistent login
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            authService.getUserStatus();
            console.log('TEST');
            if (next.access.restricted && !authService.isLoggedIn() === false) {
                $location.path('/auth');
            }
        });
});
/** @ngInject */
function navbar(){
    return {
        restrict        : 'E',
        templateUrl     : 'app/partials/navbar.html',
        controller      : 'MainController',
        controllerAs    : 'vm',
        bindToController: true
    };
}
