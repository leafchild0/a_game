/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
mongoose = require('mongoose'); //MongoDB integration

//Connect to database "Game"
mongoose.connect( 'mongodb://localhost/a_game' );

//In case of any additional operations with DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected to project database");
});

var Comments = new mongoose.Schema({
	body: String,
	date: {type: Date, default: Date.now}
});
//Schemas
var Item = new mongoose.Schema({
	id: Number,
	name: String,
	type: String,
	description: String,
	priority: Number,
	subtasks: [],
	tags: [{tag: String}],
	comments : [ Comments ],
	date: { type: Date, default: Date.now },
	reference: String

});

//Models
var ItemModel = mongoose.model( 'Item', Item );

module.exports = {
	item: ItemModel
};