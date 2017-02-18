var mongoose = require( 'mongoose' );
module.export = {
  con: mongoose.connect(process.env.DB)
}
