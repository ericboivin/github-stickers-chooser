var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Sticker API'});   
});

router.route("/access/:key")
    .post(function(req, res) {
    	Etudiant.find({'code':req.params.code}, function(err, etudiant) {
            if (err){
                res.send(err);
                return;
            }
            res.json(etudiant);
        });
        
    	console.log(req.params.key)
        res.json(req.params.key);
    });

module.exports = router;