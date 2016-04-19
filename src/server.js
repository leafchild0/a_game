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
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    passport = require('passport');

var dist = __dirname + '/../dist';
var configDB = require('./config');
var port = configDB.port;
var LocalStrategy = require('passport-local' ).Strategy;
var User = require( "./models" ).user;
//Custom routes
var routes = require('./routes');

//Connect to database "a_game"
mongoose.connect(configDB.dbUrl);
//In case of any additional operations with DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to project database");
});

var app = express();

//Middleware
app.use(favicon(dist + '/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(methodOverride());
app.use(session({
    secret: 'testing_passport',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(dist));

// configure passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(routes);

app.get('/', function (req, res) {
    res.sendFile(path.join(dist + '/index.html'));
});

// error hndlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
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
