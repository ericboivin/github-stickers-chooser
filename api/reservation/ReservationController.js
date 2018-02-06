var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Sticker = require('../sticker/Sticker');
var Reservation = require('./Reservation');

router.post('/', function (req, res) {
    if (!req.body.studentkey) return res.status(400).send("Missing studentkey and/or stickerid body parameter")

    Reservation.findOne({student: req.body.studentkey}, function (err, student){
        if (err) return res.status(500).send("Problem encountered while returning the student");
        if (student) return res.status(404).send("Student has already done his/her reservation");
        Reservation.create({
            sticker : req.body.stickerid,
            student : req.body.studentkey
        }, 
        function (err, reservation) {
            if (err) return res.status(500).send("Problem encountered while saving the new reservation");
            Sticker.findById(req.body.stickerid, function (err, sticker) {
                if (err) return res.status(500).send("Problem encountered while returning the sticker");
                if (!sticker) return res.status(404).send("Sticker not found");
                if (sticker.quantity < 1) return res.status(400).send("Sticker not available");

                Sticker.findByIdAndUpdate(req.body.stickerid, { $inc: { quantity: -1} }, {new: true}, function (err, updatedsticker) {
                    if (err) return res.status(500).send("There was a problem updating the sticker.");
                });
            });
            return res.status(200).send(reservation);
        });
    });
 });

router.get('/', function (req, res) { 
    Reservation.find({}, function (err, reservations) {
        if (err) return res.status(500).send("Problem encountered while returning the reservations");
        res.status(200).send(reservations);
    });
 });
    

module.exports = router;