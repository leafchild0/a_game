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
	
	DetailsController.$inject = ['editItem', '$uibModalInstance', 'itemService'];
	/** @ngInject */
	function DetailsController(editItem, $uibModalInstance, itemService) {
		var vm = this;
		vm.editItem = editItem;
		vm.priorityOptions = [1, 2, 3];
		vm.message = '';

		//TODO: Save item after edit
		vm.saveItem = function () {

			itemService.singleItem().update({id: editItem._id}, editItem).$promise.then(
				  function () {
					  //Do nothing in this case
					  //Just be happy for now
					  $uibModalInstance.close();
				  },
				  function ( response ) {
					  vm.message = "Error: " + response.status + " " + response.statusText;
				  });
		};

	}
	
})();