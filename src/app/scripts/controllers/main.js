/**
 * Created by: leafchild
 * Date: 2/20/16
 * Time: 10:18
 */

(function (){
    'use strict';
    
    angular.module( 'aGame' ).controller( 'MainController', MainController );
    
    MainController.$inject = [ '$scope', '$aside', 'itemService' ];
    
    /** @ngInject */
    function MainController( $scope, $aside, itemService ){
        var vm      = this;
        vm.items    = [];
        vm.newItem  = {};
        vm.fileName = 'items_' + Date.now();
        vm.exportHeaders = ['Name', 'Type', 'Priority', 'Description', 'Created Date'];
        
        vm.exportData = function (){
            return vm.items.map(function(item){
                return {
                    name       : item.name,
                    type       : item.type,
                    priority   : item.priority || 0,
                    description: item.description || '',
                    createdDate: new Date(item.createdDate).toLocaleString( 'en-US' )
                }
            });    
        };
        
        vm.getItems = function (){
            itemService.items().getAll(
                function ( response ){
                    //Assign it to existingUsers
                    vm.items = response;
                },
                function ( response ){
                    vm.message = "Error: " + response.status + " " + response.statusText;
                } );
        };
        
        vm.addItem = function ( item ){
            //Add other required values
            item.type = item.type || 'quest';
            //And persist in DB
            itemService.items().add( item ).$promise.then(
                function ( response ){
                    //Add item to the collection of items
                    vm.items.push( response );
                },
                function ( response ){
                    vm.message = "Error: " + response.status + " " + response.statusText;
                } );
            //Cleanup
            vm.newItem = { name: "" };
            $scope.questForm.$setPristine();
            
        };
        
        vm.deleteItem = function ( item, $index ){
            //Verify whether item is fine
            
            //delete from DB
            itemService.singleItem().delete( { id: item._id }, item ).$promise.then(
                function (){
                    //delete item from items collection
                    vm.items.splice( $index, 1 );
                },
                function ( response ){
                    vm.message = "Error: " + response.status + " " + response.statusText;
                } );
        };
        
        vm.editItem = function ( item ){
            
            /*
             * BootstrapUI modal
             * Has method close()
             * see http://angular-ui.github.io/bootstrap/
             * Search for a modal
             * */
            var details = $aside.open( {
                templateUrl : 'app/partials/details.html',
                controller  : 'DetailsController',
                controllerAs: 'details',
                placement   : 'right',
                keyboard    : true,
                size        : 'sm',
                resolve     : {
                    //Is it going last? Are they all running last? Params!
                    //Anyway it's going to another Controller here
                    editItem: item,
                    items   : function (){ return vm.items; }
                }
            } );
            
            details.result.finally( function (){
                //Saving an updates on item
                if ( item.changed ){
                    itemService.singleItem().update( { id: item._id }, item ).$promise.then(
                        function (){
                            //Do nothing in this case
                            //Just be happy for now
                            //$uibModalInstance.close();
                        },
                        function ( response ){
                            vm.message = "Error: " + response.status + " " + response.statusText;
                        }
                    );
                }
            } );
            
        };
    }
})();