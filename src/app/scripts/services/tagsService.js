/**
 * Created by: leaf
 * Date: 3/30/16
 * Time: 8:46 AM
 */

(function () {
	'use strict';

	angular
		  .module('aGame')
		  .service('tagsService', TagsService);

	//TagsService.$inject = [];
	/** @ngInject */
	function TagsService(  ) {
		var vm = this;
		vm.tags = [];

		vm.getTagsFromItems = function(items) {
			items.forEach(function(item) {
				item.tags.forEach(function(tag) {
					if(!tags[tag]) vm.tags.push(tag);
				});
			});
			return vm.tags;
		}

	}

})();
