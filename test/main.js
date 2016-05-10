/**
 * Created by: leafchild
 * Date: 5/10/16
 * Project: a_game
 */

'use strict';

describe( 'MainController', function (){

  var MainCtrl = null,
      scope = null;

  // load the controller's module
  beforeEach( module( 'aGame' ) );
  
  // Initialize the controller and a mock scope
  beforeEach( inject( function ( $controller, $rootScope ){
    scope    = $rootScope.$new();
    MainCtrl = $controller( 'MainController', {
      $scope: scope
    } );
  } ) );
  
  /*it( 'MainController to be defined', function (){
    //expect(MainCtrl).toBeDefined();
    console.log( MainCtrl );
  } );*/
  
  /*exportData
   * getItems
   * addItem
   * deleteItems
   * editItem*/
  /*it('should add items to the list', function () {
   scope.todo = 'Test 1';
   scope.addTodo();
   expect(scope.todos.length).toBe(1);
   });
   
   it('should add then remove an item from the list', function () {
   scope.todo = 'Test 1';
   scope.addTodo();
   scope.removeTodo(0);
   expect(scope.todos.length).toBe(0);
   });*/
  
} );