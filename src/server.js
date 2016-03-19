/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var express = require('express'),
	  path = require('path'),
	  bodyParser = require('body-parser'),
	  errorHandler = require('errorhandler'),
	  methodOverride = require('method-override'),
	  favicon = require('serve-favicon'),
	  logger = require('morgan');

var ItemModel = require("./db.js").item;
var port = 3031;
var dist = __dirname + '/../dist';

var app = express();

app.use(express.static(dist));

app.get('/', function(req, res){
	res.sendFile('/index.html');
});

//Middleware
app.use(favicon(dist  +'/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Custom routes
var routes = require('./routes.js')(app, ItemModel);

// error handling middleware should be loaded after the loading the routes
if ('dev' == app.get('env')) {
	app.use(errorHandler());
}

//Start server
app.listen(port, function () {
	console.log('Express server listening on port %d in %s mode',
		  port, app.settings.env);
});

