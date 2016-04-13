var express = require('express');
var router = express.Router();


var Contact = require('../models/contact.js');

router.get('/', function(req, res, next) {
 Contact.find(function(err, list) {
      if (err) {
        console.log(err);
      } else {
        console.log('Cool');
        console.log(list);
        res.json(list);
      }

    });
});


router.get('/add', function (req, res, next) {
	res.render('contact/add.twig', {arg: 'get Contact Page'}) 
});

router.post('/add', function (req, res, next) {
new Contact({
        name: req.body.name,
        subject: req.body.subject ,
        email: req.body.email ,
        phone: req.body.phone ,
        text: req.body.text
      })
          .save(function(err, Tweet) {
            if(err){
              console.log(err);
            }else{
              console.log('Saved Succcesfully');
              res.redirect('/#/contacts')
            }
          });
	

});


module.exports = router;