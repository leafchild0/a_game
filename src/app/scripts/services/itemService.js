/**
 * Created by: leaf
 * Date: 3/18/16
 * Time: 1:30 PM
 */

(function () {
	'use strict';
	
	angular
		  .module('aGame')
		  .service('itemService', ItemService);
	
	ItemService.$inject = [ '$resource', 'baseURL' ];
	/** @ngInject */
	function ItemService( $resource, baseURL ) {
		var vm = this;
		
		vm.singleItem = function () {
			//Get a specific item
			//Update item
			//Delete item
			return $resource(baseURL + 'api/item/:id', null, {
				'update': { method: 'PUT' }
			});
		};
		vm.items = function () {
			//Get All items
			//Delete All items
			//Create items with POST
			return $resource(baseURL + 'api/items', null, {
				'add': { method:   'POST' },
				'getAll': { method:   'GET' , isArray:true }
			});
		}
	}
	
})();
