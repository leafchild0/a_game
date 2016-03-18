/**
 * Created by: leafchild
 * Date: 2/20/16
 * Time: 10:18
 */

(function() {
	'use strict';
	
	angular
		  .module('aGame')
		  .controller('DetailsController', DetailsController);
	
	DetailsController.$inject = ['editItem'];
	/** @ngInject */
	function DetailsController(editItem) {
		var vm = this;

		vm.editItem = editItem;
		vm.message = 'Test';
	}
	
})();