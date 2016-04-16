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
        vm.isLoggedIn = false;

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

	}

})();
