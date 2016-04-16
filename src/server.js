/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var express        = require( 'express' ),
    path           = require( 'path' ),
    errorHandler   = require( 'errorhandler' ),
    methodOverride = require( 'method-override' ),
    favicon        = require( 'serve-favicon' ),
    logger         = require( 'morgan' ),
    cookieParser   = require( 'cookie-parser' ),
    bodyParser     = require( 'body-parser' ),
    session        = require( 'express-session' ),
    mongoose        = require( 'mongoose' ),
    passport       = require( 'passport' );

var dist     = __dirname + '/../dist';
var configDB = require( './config' );
var port     = configDB.port;

var app = express();

app.use( express.static( dist ) );

//Middleware
app.use( favicon( dist + '/favicon.ico' ) );
app.use( logger( 'dev' ) );
app.use( methodOverride() );
app.use( cookieParser() ); 
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( session( {
    secret           : 'testing_passport',
    resave           : false,
    saveUninitialized: false
} ) ); // session secret
app.use( passport.initialize() );
app.use( passport.session() ); // persistent login sessions

//Custom routes
var routes = require( './routes.js' )( app, passport );

app.get( '/', function ( req, res ){
    res.sendFile( path.join( dist + '/index.html' ) );
} );

//Connect to database "a_game"
mongoose.connect( configDB.dbUrl );

//In case of any additional operations with DB
var db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function (){
    console.log( "Connected to project database" );
} );

// error handling middleware should be loaded after the loading the routes
if ( 'dev' == app.get( 'env' ) ){
    app.use( errorHandler() );
}

//Start server
app.listen( port, function (){
    console.log( 'Express server listening on port %d in %s mode',
        port, app.settings.env );
} );
