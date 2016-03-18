/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var express = require( 'express' ), //Web framework
	  path = require( 'path' ), //Utilities for dealing with file paths
	  ItemModel = require( "./db.js" ).item;


var app = express();

app.use( express.static( './app' ) );


/**Routes
 * GET query
 * GET by id
 * POST new
 * PUT update
 * DELETE*/

//Get a list of all quests
app.get( '/quests', function( request, response ){
	return ItemModel.find( function( err, quests ){
		if( err ) return response.send( err );

		return response.send( quests );
	} );
} );

//Insert a new quest
app.post( '/quests', function( request, response ){

	var quest = new ItemModel( {
		name: request.body.name,
		type: request.body.type
	} );
	quest.save( function( err ){
		if( err ) return response.send( err );

		return console.log( quest.name + ' has been created' );
	} );
	return response.send( quest );
	
} );

//Get a single quest by id
app.get( '/quests/:id', function( request, response ){
	return ItemModel.findById( request.params.id, function( err, quest ){
		if( err ) return response.send( err );

		return response.send( quest );
	} );
} );

//Update a quest
app.put( '/quests/:id', function( request, response ){
	console.log( 'Updating quest ' + request.body.name );
	return ItemModel.findById( request.params.id, function( err, quest ){
		quest.name = request.body.name;
		quest.description = request.body.description;
		quest.type = request.body.type;
		quest.priority = request.body.priority;
		//Correct add of comments
		if( request.body.isComment ) quest.comments.push( { body: request.body.comments } );
		quest.tags = request.body.tags;
		quest.date = request.body.date;
		quest.reward = request.body.reward;
		return quest.save( function( err ){
			if( err ) console.log( err );
			else console.log( 'quest updated' );

			return response.send( quest );
		} );
	} );
} );

//Delete a quest
app.delete( '/quests/:id', function( request, response ){
	console.log( 'Deleting quest with id: ' + request.params.id );
	return ItemModel.findById( request.params.id, function( err, quest ){
		return quest.remove( function( err ){
			if( err ) return response.send( err );

			console.log( 'quest removed' );
			return response.send( '' );
		} );
	} );
} );


//Start server
var port = 3000;
app.listen( port, function(){
	console.log( 'Express server listening on port %d in %s mode',
		  port, app.settings.env );
} );

