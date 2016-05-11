/**
 * Created by: leafchild
 * Date: 2/20/16
 * Time: 10:18
 */

(function () {
	'use strict';

	angular
		.module('aGame')
		.controller('DetailsController', DetailsController);

	DetailsController.$inject = ['editItem', 'items', '$scope', 'tagsService'];
	/** @ngInject */
	function DetailsController(editItem, items, $scope, tagsService) {
		var vm = this;
		vm.editItem = editItem;
		vm.message = '';
		vm.priorityOptions = [1, 2, 3];
		vm.dueDatePopup = {};
		vm.dueDatePopup.opened = false;
		vm.popoverTemplate = 'referencePopover.html';
		vm.currentReference = {};
		vm.rewards = items.filter(function (item) { return item.type === 'reward' });
		vm.quests = items.filter(function (item) { return item.type === 'quest' });

		vm.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		};

		vm.addComment = function () {
			if (vm.newComment != '') {
				vm.editItem.comments.push({ body: vm.newComment, date: new Date() });
				vm.newComment = '';
			}
		};

		vm.updateReference = function (item) {
			//Assign a reference as an id
			vm.editItem.reference = item._id;
			//Cross set up
			item.reference = editItem._id;
			vm.populateReferenceInfo();
		};

		vm.populateReferenceInfo = function () {
			if (vm.editItem.reference) {
				//Get reference object and populate it
				var item = vm.rewards.filter(function (item) { return item._id === vm.editItem.reference }).shift();

				if (item) {
					vm.currentReference = {
						dueDate: item.dueDate,
						name: item.name,
						description: item.description,
						priority: item.priority
					};
				}
			}
		};

		vm.showDueDate = function () {
			vm.dueDatePopup.opened = true;
		};

		vm.getTags = function (query) {
			return tagsService.getTagsFromItems(items);
		};

        //Init function
        (function () {
            //Everything to be run on init
            //Parse due date in order to show modal for it
            if (angular.isString(vm.editItem.dueDate)) {
                vm.editItem.dueDate = Date.parse(vm.editItem.dueDate);
            }

            //This method will be called several times, but it will save the object only on closing the modal
            $scope.$watchCollection(vm.editItem, function () {
                $scope.$on('modal.closing', function () {
                    //Just marking that item was changed and because of that will notify server
                    vm.editItem.changed = true;
                });
            });
            //TODO: Populate reference if item already have it

        })();
	}
})();