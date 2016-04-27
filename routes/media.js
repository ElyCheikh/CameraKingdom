var express = require('express');
var router = express.Router();

var Media = require('../models/media.js');

router.get('/', function(req, res, next) {
    Media.find(function(err, list) {
        if (err) {
            console.log(err);
        } else {
            console.log(list);
            res.json(list);
        }

    });
});

router.post('/upload', function (req, res, next) {
    new Media({
        titre: req.body.titre,
        nomfichier: req.body.filename
    })
        .save(function(err) {
            if(err){
                console.log(err);
            }else{
                console.log('Saved Succcesfully');
                res.redirect('/#/home')
            }
        });


});

module.exports = router;