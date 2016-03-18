/**
 * Created by: leafchild
 * Date: 2/20/16
 * Time: 10:18
 */

(function() {
	'use strict';

	angular
		  .module('aGame')
		  .controller('LoginController', LoginController);

	LoginController.$inject = [];

	/** @ngInject */
	function LoginController() {
	  	var vm = this;
	}

})();