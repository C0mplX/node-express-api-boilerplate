var mongoose     = require('mongoose');
var hash         = require( 'password-hash' );

var users        = require( '../database/schema/users.js' );

var register  = module.exports = {};
var User = mongoose.model( "User", users.Schema );
// Build the user modal
register.doSignup = function( req, res ) {
  // Get the req params
  var body = req.body.data;

  var error = [];

  /**
   * Validate body 
   */

  // Validate email
  if(validator.isEmpty( body.email+"" ) )
    error.push( { email: 'Fill in email' } );
  if(!validator.isEmail( body.email ) ) 
    error.push( { email: 'This is not a email adress' } );

  // Validate fname
  if(validator.isEmpty( body.fname+"" ) )
    error.push( { fname: 'Fill in firstname' } );
  
  // Validate lname 
  if(validator.isEmpty( body.lname+"" ) )
    error.push( { lname: 'Fill in lname' } );
  
  // Validate password 
  if( !validator.isLength( body.password+"", { min: 6, max: 20 } ) )
    error.push( { password: 'password needs to be at least 6 caracters long but no longer then 20' } );
  
  // check if a user exists in the database.  
  if( error.length != 0 ) {
    res.status(400);
    res.json( { success: false, message: error } );
  } else {
    User.findOne( {email: body.email}, function( err, user ) {
      if( user ) {
        // User exists return
        res.status(400);
        res.json( { success: false, message: { message: { msg: 'User Exists' } } } );
      }else {

        // User does not exists, create a new one and return response.
        var user = new User({
          fname: body.fname,
          lname: body.lname,
          email: body.email,
          password: hash.generate(body.password)
        });

        user.save( function( err, user ) {
          if( err ) {
            res.status(400);
            res.json( {success: false, message: { message: { msg: 'Could not create user' } } } );
          } else {
            res.status(200);
            res.json( {success: true, message: 'User Created'} );
          }
        } );

      }
    } );
  }
 
  

}
