var jwt = require( 'jsonwebtoken' );
var auth = module.exports = {};

auth.authenticate = function( req, res, next ) {
/**
* @middleware for checking if a valid JWT token is pressent in the authorization header.
* @uses Basic auth
* @param req, res, next
* @return Http response or a req.uid for use in request handlers.
*/

  if (!req.headers.authorization) {
    /**
    * No header is present, just return a 401, and deny access
    */
    res.status( 401 );
    return res.json( { success: false, message: "No Access" });
   }else {

    /**
    * Header is present split the encoded Basic header,
    * and check if JWT is correct formated.
    */
    var token = req.headers.authorization.split(' ')[1];
    //Check token
    jwt.verify(token, process.env.JWT_TOKEN, function(err, decoded) {
      if( !err ) {

        /**
        * Do call to Database here with the ID recoverd from the JWT. This to verify
        * that the user exists, are not deactivated or deleted.
        * If it exists we attach it to the req obj, so we can use it in our request handlers.
        */
        req.uid = decoded.id;
        next();
      }else {
        res.status( 401 );
        return res.json( {success: false, message: "No Access" } );
      }
    });

   }
}
