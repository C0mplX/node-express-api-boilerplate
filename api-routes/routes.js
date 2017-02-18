var router = require('express').Router();
//Classes
var login       = require( '../models/login' );
var signup      = require( '../models/signup' );

// Api routes
router.post( '/login', function( req, res ) {
  login.doLogin( req, res );
} );

router.post( '/signup', function( req, res ) {
  signup.doSignup( req, res );
} );

router.get( '/auth', auth.authenticate, function( req, res ) {
  res.json( { success: true, message: 'Access granted' } );
} );

module.exports = router;
