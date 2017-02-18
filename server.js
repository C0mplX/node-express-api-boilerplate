/**
* Main server.
* Creates the server and setup the rest API with DATABASE.
* @version 1.0.0
* @author Ole Martin Skaug
*/

/**********************
* DEPENDENCIES
**********************/

// Express setup
express           = require( 'express' );
app               = express();
var http          = require( 'http' ).createServer(app);

//If you are planing on using sockiet.io uncomment this line. Remember to install socket.io
//io              = require('socket.io')(http);

// Body-parser and validation
var bodyParser   = require('body-parser');
validator        = require('validator');

// Database
var db            = require( './database/connect.js' );

// Auhtentication
auth              = require( './middleware/auth/auth' );

// Routes
var apiRoutes     = require( './api-routes/routes' );

/**
* Set the port so it is available thorugh the environment variable.
* This is required if you are going to deploy the app on Heroku
*/
app.set('port', (process.env.PORT) );

/**
* Include the parser
*/
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use (bodyParser.json() );
/**
* Setup the Api endpoint router
*/
app.use('/api', apiRoutes);

/**
* Set up the listener on the port assign by heroku.
*/
http.listen( app.get('port'), function() {
  console.log( 'server is running...' );
} );
