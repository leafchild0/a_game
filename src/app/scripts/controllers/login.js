/**
 * Created by: leafchild
 * Date: 2/20/16
 * Time: 10:18
 */

(function (){
    'use strict';

    angular.module( 'aGame' ).controller( 'LoginController', LoginController );

    LoginController.$inject = [ 'authService', '$location' ];

    /** @ngInject */
    function LoginController( authService, $location ){
        var vm     = this;
        vm.message = null;

        vm.signup = function ( newUser ){

            //Make a call to the backend which will return User info or error message
            authService.signup().save( newUser ).$promise.then(
                function ( response ){
                    //Add item to the collection of items
                    $location.path( '/login' ).replace();
                },
                function ( response ){
                    vm.message = "Error: " + response.status + " " + response.data.status;
                } );
        };

        vm.login = function ( user ){
            //Make a call to the backend which will return User info or error message
            authService.login().make( user ).$promise.then(
                function ( response ){
                    //Add item to the collection of items
                    authService.setLoggedIn( true );
                    $location.path( '/main' ).replace();
                },
                function ( response ){
                    vm.message = "Error: " + response.status + " " + response.data.status;
                } );
        };

    }

})();
