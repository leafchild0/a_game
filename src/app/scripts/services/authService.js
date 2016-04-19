/**
 * Created by: leaf
 * Date: 3/30/16
 * Time: 8:46 AM
 */

(function () {
	'use strict';

	angular
		  .module('aGame')
		  .service('authService', AuthService);

	AuthService.$inject = [ '$resource', 'baseURL' ];
	/** @ngInject */
	function AuthService( $resource, baseURL ) {
		var vm = this;
        vm.isLogged = false;

        vm.login = function () {
			//Get user info
			//Login user
			return $resource(baseURL + 'login', null, {
				'make': { method:   'POST' }
			});
		};

		vm.signup = function () {
			//Get user info
			//Create user
			return $resource(baseURL + 'signup', null, {});
		};

		vm.userStatus = function () {
			//Get user info
			//Create user
			return $resource(baseURL + 'status', null, {});
		};

		vm.isLoggedIn = function () {
			return vm.isLogged;
		}

		vm.setLoggedIn = function (logged) {
			vm.isLogged = logged;
		}

	}

})();
