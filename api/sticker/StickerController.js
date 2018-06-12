var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Sticker = require('./Sticker');

router.get('/', function (req, res) {
    Sticker.find({ quantity: { $gt: 0 } } , function (err, stickers) {
        if (err) return res.status(500).send("Problem encountered while returning the stickers");
        res.status(200).send(stickers);
    });
});

router.get('/:id', function (req, res) {
    Sticker.findById(req.params.id, function (err, sticker) {
        if (err) return res.status(500).send("Problem encountered while returning the sticker");
        if (!sticker) return res.status(404).send("Sticker not found");
        res.status(200).send(sticker);
    });
});

router.post('/', function (req, res) {
    Sticker.create({
        name : req.body.name,
        quantity : req.body.quantity
    }, 
    function (err, sticker) {
        if (err) return res.status(500).send("Problem encountered while saving the new sticker");
        res.status(200).send(sticker);
    });
});

module.exports = router;