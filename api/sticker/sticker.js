var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StickerSchema  = new mongoose.Schema({
    name: String,
    quantity: Number
});

mongoose.model('Sticker', StickerSchema);
module.exports = mongoose.model('Sticker');