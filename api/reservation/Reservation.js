var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema  = new mongoose.Schema({
    sticker: String,
    student: String
});

mongoose.model('Reservation', ReservationSchema);
module.exports = mongoose.model('Reservation');