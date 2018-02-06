var mongoose   = require('mongoose');
var uri = process.env.MONGOLAB_URI;

mongoose.connect(uri);