/**
 * Created by: leafchild
 * Date: 2/20/16
 * Time: 10:18
 */

(function() {
	'use strict';

	angular
		  .module('aGame')
		  .controller('MainController', MainController);

	MainController.$inject = ['$scope', '$aside'];

	/** @ngInject */
	function MainController($scope, $aside) {
		var vm = this;
		vm.items = [];
		vm.newItem = {};

		//TODO: Get Items
		vm.getItems = function(item) {

		};

		//TODO: Add Item
		vm.addItem = function(item) {
			//Add other required values
			item.type = item.type || 'quest';
			//Add item to the collection of items
			vm.items.push(item);
			//And persist in DB

			//Cleanup
			vm.newItem = { name: "" };
			$scope.questForm.$setPristine();

		};

		//TODO: Delete Item
		vm.deleteItem = function($index) {
			//Verify whether item is fine
			//delete item from items collection
			vm.items.splice($index, 1);
			//delete from DB
		};

		//TODO: Edit item?
		vm.editItem = function(item) {

			/*
			* BootstrapUI modal
			* Has method close()
			* see http://angular-ui.github.io/bootstrap/
			* Search for a modal
			* */
			var details = $aside.open({
				templateUrl: 'app/partials/details.html',
				controller: 'DetailsController',
				controllerAs: 'details',
				placement: 'right',
				size: 'sm',
				resolve: {
					editItem: item
				}
			});


		};

		//TODO: Save item after edit
		vm.saveItem = function(item) {

		}

	}

})();

