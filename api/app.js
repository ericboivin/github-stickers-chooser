var express = require('express');
var app = express();

var db = require('./db');

var StickerController = require('./sticker/stickerController');
app.use('/sticker', StickerController);

var ReservationController = require('./reservation/reservationController');
app.use('/reservation', ReservationController);

var StudentController = require('./student/studentController');
app.use('/student', StudentController);

module.exports = app;