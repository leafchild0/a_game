/**
 * Created by: leaf
 * Date: 11/25/15
 * Time: 12:31 AM
 */

module.exports =  function(app, ItemModel ) {

	/**Routes
	 * GET query
	 * GET by id
	 * POST new
	 * PUT update
	 * DELETE*/

//Get a list of all quests
	app.get( '/api/items', function( request, response ){
		return ItemModel.find( function( err, items ){
			if( err ) return response.send( err );

			return response.send( items );
		} );
	} );

//Insert a new quest
	app.post( '/api/items', function( request, response ){

		var item = new ItemModel( {
			name: request.body.name,
			type: request.body.type
		} );
		item.save( function( err ){
			if( err ) return response.send( err );

			return console.log( item.name + ' has been created' );
		} );
		return response.send( item );

	} );

//Get a single quest by id
	app.get( '/api/item/:id', function( request, response ){
		return ItemModel.findById( request.params.id, function( err, item ){
			if( err ) return response.send( err );

			return response.send( item );
		} );
	} );

//Update a quest
	app.put( '/api/item/:id', function( request, response ){
		console.log( 'Updating item ' + request.body.name );
		return ItemModel.findById( request.params.id, function( err, item ){
			if(request.body.name) item.name = request.body.name;
			if(request.body.description) item.description = request.body.description;
			if(request.body.type) item.type = request.body.type;
			if(request.body.priority) item.priority = request.body.priority;
			//Correct add of comments
			if(request.body.comments) item.comments = request.body.comments;
			if(request.body.tags) item.tags = request.body.tags;
			if(request.body.createdDate) item.createdDate = request.body.createdDate;
			if(request.body.dueDate) item.dueDate = request.body.dueDate;
			if(request.body.reference) item.reference = request.body.reference;
			return item.save( function( err ){
				if( err ) console.log( err );
				else console.log( item.name + ' updated' );

				return response.send( item );
			} );
		} );
	} );

//Delete a quest
	app.delete( '/api/item/:id', function( request, response ){
		console.log( 'Deleting item with id: ' + request.params.id );
		return ItemModel.findById( request.params.id, function( err, item ){
			return item.remove( function( err ){
				if( err ) return response.send( err );

				console.log( 'item removed' );
				return response.send( '' );
			} );
		} );
	} );
	
};