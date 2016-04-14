/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var express = require('express'),
	  path = require('path'),
	  errorHandler = require('errorhandler'),
	  methodOverride = require('method-override'),
	  favicon = require('serve-favicon'),
	  logger = require('morgan'),
	  configDB = require('./config.js')
	  cookieParser = require('cookie-parser'),
	  bodyParser = require('body-parser'),
	  session = require('express-session')
	  flash = require('connect-flash'),
	  passport = require('passport');

var ItemModel = require("./db.js").item;
var port = configDB.port;
var dist = __dirname + '/../dist';

var app = express();

app.use(express.static(dist));

//Middleware
app.use(favicon(dist  +'/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser()); // read cookies (needed for auth)
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'testing_passport' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Custom routes
var routes = require('./routes.js')(app, passport);

app.get('/', function(req, res) {
	res.sendFile('/index.html');
});

// error handling middleware should be loaded after the loading the routes
if ('dev' == app.get('env')) {
	app.use(errorHandler());
}

//Start server
app.listen(port, function () {
	console.log('Express server listening on port %d in %s mode',
		  port, app.settings.env);
});
