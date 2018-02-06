var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Student = require('./Student');

router.get('/:key', function (req, res) {
    Student.findOne({cle: req.params.key}, function (err, student){
        if (err) return res.status(500).send("Problem encountered while returning the student");
        if (!student) return res.status(404).send("Student not found");
        res.status(200).send(student);
    });
});

module.exports = router;