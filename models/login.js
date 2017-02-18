var jwt           = require( 'jsonwebtoken' );
var mongoose      = require('mongoose');
var hash         = require( 'password-hash' );
var users         = require( '../database/schema/users.js' );


//Export module
var login         = module.exports = {};

var User = mongoose.model( "User", users.Schema );

login.doLogin = function( req, res ) {
  // Test if login is correct
  var body     = req.body.data

  // Check if input is filled
  var error = [];

  // Validate email
  if(validator.isEmpty( body.email+"" ) )
    error.push( { email: 'Fill in email' } );
  if(!validator.isEmail( body.email ) ) 
    error.push( { email: 'This is not a email adress' } );

  // Validate password
  if(validator.isEmpty( body.password+"" ) )
    error.push( { email: 'Fill in password' } );

  if( error.length != 0 ) {
    res.status(400);
    res.json( { success: false, message: error } );
  }else {
    // All good, check if user exists.
    User.findOne( {email: body.email}, function( err, user ) {

      if( user ) {

        // User exists match password
        if( hash.verify(body.password, user.password ) ) {

          // All is good here, sign the jwt
          var token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

          res.json({ success: true, message: token });

        }else {
          res.status(400);
          res.json( { success: false, message: { message: { msg: 'Password is not correct' } } } );
        }

      }else {
        res.status(404);
        res.json( { success: false, message: { message: {msg: 'No user with '+body.email+' exists.'} } } );
      }

    } );
  }
 
}
