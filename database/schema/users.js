var mongoose = require( 'mongoose' );
var user = module.exports = {};

var userSchema = mongoose.Schema( {
  fname: {
    type: String,
    require: true
  },
  lname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique : true,
    required: true,
  },
  password: { type: String, required: true, trim: true },
  created: { type: Date, default: Date.now },
} );
user.Schema = userSchema;
