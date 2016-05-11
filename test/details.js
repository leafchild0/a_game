/**
 * Created by: leafchild
 * Date: 5/10/16
 * Project: a_game
 */

'use strict';

describe('DetailsController', function () {

    var details,
        scope,
        items,
        editItem;

    // load the controller's module
    beforeEach(module('aGame'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {

        items = [{
            "_id": "5720ccda2285eb1645cd27bb",
            "name": "Test",
            "type": "quest",
            "owner": "571f8ae40bd78dde23c83df1",
            "__v": 0,
            "createdDate": "2016-04-27T14:29:46.957Z",
            "comments": [],
            "tags": [],
            "subtasks": []
        }, {
                "_id": "5720df3ed8a8f2937f3878fd",
                "name": "Next",
                "type": "reward",
                "owner": "571f8ae40bd78dde23c83df1",
                "__v": 0,
                "createdDate": "2016-04-27T15:48:14.700Z",
                "comments": [],
                "tags": [],
                "subtasks": []
            }];

        editItem = items[0];

        scope = $rootScope.$new();
        details = $controller('DetailsController', {
            $scope: scope,
            editItem: items[0],
            items: items
        });

    }));


    it('DetailsController to be defined', function () {
        expect(details).toBeDefined();

    });

    it('should have default values', function () {

        expect(details.editItem).toEqual(editItem);
        expect(details.message).toEqual('');
        expect(details.priorityOptions).toEqual([1, 2, 3]);
        expect(details.currentReference).toEqual({});
        expect(details.dateOptions.formatYear).toEqual('yy');

    });


    it('should add a comment', function () {

        details.newComment = 'Test comment';

        details.addComment();

        expect(details.editItem.comments.length).toEqual(1);
        expect(details.newComment).toEqual('');

    });

    it('should update a reference', function () {

        details.updateReference(items[1]);

        expect(details.editItem.reference).toEqual(items[1]._id);
        expect(items[1].reference).toEqual(details.editItem._id);
        expect(details.currentReference).toBeDefined();
        expect(details.currentReference).toEqual({
            dueDate: items[1].dueDate,
            name: items[1].name,
            description: items[1].description,
            priority: items[1].priority
        });

    });

});
