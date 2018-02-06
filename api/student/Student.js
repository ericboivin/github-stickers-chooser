var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema  = new mongoose.Schema({
    code: String,
    cle: String
});

mongoose.model('etudiant', StudentSchema);
module.exports = mongoose.model('etudiant');