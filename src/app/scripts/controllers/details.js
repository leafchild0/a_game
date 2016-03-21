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
	
	DetailsController.$inject = ['editItem', 'rewards', '$scope'];
	/** @ngInject */
	function DetailsController(editItem, rewards, $scope) {
		var vm = this;
		vm.editItem = editItem;
		vm.priorityOptions = [ 1, 2, 3 ];
		vm.message = '';
		vm.rewards = rewards;

		$scope.$watchCollection('editItem', function() {
			//Just marking that item was changed and because of that will notify server
			editItem.changed = true;
		});

		vm.addComment = function() {
			if(vm.editItem.newComment != '') {
				vm.editItem.comments.push({body: vm.newComment, date: new Date()});
				vm.editItem.newComment = '';
			}
		} ;
	}
})();