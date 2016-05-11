/**
 * Created by: leafchild
 * Date: 5/10/16
 * Project: a_game
 */

'use strict';

describe('MainController', function () {

    var main,
        scope,
        $httpBackend;

    // load the controller's module
    beforeEach(module('aGame'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        scope = $rootScope.$new();
        main = $controller('MainController', {
            $scope: scope
        });

        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', 'http://localhost:3000/status').respond({
            status: true
        });

        $httpBackend.when('GET', 'http://localhost:3000/items').respond(
            [{
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
                    "type": "quest",
                    "owner": "571f8ae40bd78dde23c83df1",
                    "__v": 0,
                    "createdDate": "2016-04-27T15:48:14.700Z",
                    "comments": [],
                    "tags": [],
                    "subtasks": []
                }]
        );

    }));


    it('MainController to be defined', function () {
        expect(main).toBeDefined();

    });

    it('should have default values', function () {

        expect(main.newItem).toEqual({});
        expect(main.items).toEqual([]);
        expect(main.exportHeaders.length).toEqual(5);

    });

    /*
     * deleteItems
     * editItem*/
    it('should return few exiting items', function () {

        $httpBackend.expectGET('http://localhost:3000/items');
        $httpBackend.expectGET('http://localhost:3000/status');

        main.getItems();
        $httpBackend.flush();

        expect(main.items.length).toEqual(2);

        it('returned items should be correctly represented', function () {

            expect(main.items[0].name).toEqual('Test');
            expect(main.items[0].type).toEqual('quest');

            expect(main.items[1].name).toEqual('Next');
            expect(main.items[1].type).toEqual('quest');
        });

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    });

    it('should add a new item', function () {

        var item = {
            name: 'New Item',
            type: 'reward',
            owner: '571f8ae40bd78dde23c83df1'
        };

        $httpBackend.expectPOST('http://localhost:3000/items', item).respond(201, {
            item: item
        });

        main.addItem(item);
        $httpBackend.flush();

        expect(main.items.length).toEqual(1);

        expect(main.items[0].item.name).toEqual('New Item');
        expect(main.items[0].item.type).toEqual('reward');
        expect(main.items[0].item.owner).toEqual('571f8ae40bd78dde23c83df1');

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    });

    it('should edit item', function () {

        var item = {
            id: '5720ccda2285eb1645cd27b1',
            name: 'New Item',
            type: 'reward',
            owner: '571f8ae40bd78dde23c83df1'
        };


        $httpBackend.expectPOST('http://localhost:3000/items', item).respond(201, {
            item: item
        });

        main.addItem(item);
        $httpBackend.flush();

        var item2 = {
            id: '5720ccda2285eb1645cd27b1',
            name: 'Edited Item',
            type: 'quest',
            owner: '571f8ae40bd78dde23c83df1',
            changed: true
        };


        $httpBackend.expectPUT('http://localhost:3000/item/' + item._id, item2).respond(201, {
            item: item
        });

        main.editItem(item);
        main.details.close(true);
        $httpBackend.flush();

        expect(main.items.length).toEqual(1);

        expect(main.items[0].item.name).toEqual('Edited Item');
        expect(main.items[0].item.type).toEqual('quest');
        expect(main.items[0].item.owner).toEqual('571f8ae40bd78dde23c83df1');

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    });

});
