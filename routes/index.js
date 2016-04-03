var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var email = require('emailjs');
var flash = require('connect-flash');

var token = randtoken.generate(32);


router.get('/', function(req, res, next) {
  res.render('auth/index.twig', {
    user: req.user
  });
});

router.get('/register', function(req, res) {
  res.render('auth/register.twig', {});
});

router.post('/register', function(req, res) {
  Account.register(new Account({
      username: req.body.username,
      email: req.body.email,
      email_verified: token
    }),
    req.body.password,
    function(err, account) {
      if (err) {
        console.log(err);
        return res.render('auth/register.twig', {
          account: account
        });
      }
      EmailVerif(req.body.email);
      //res.render('verify_email.twig'); node
      res.redirect('/#/verify');

    });
});

router.get('/login', function(req, res) {
  res.render('auth/login.twig', {
    user: req.user
  });
});

router.post('/login', passport.authenticate('local', {
  //successRedirect: '/',
  failureRedirect: '/#/login',
  failureFlash: true
}), function(req, res, next) {
  console.log(req.body.username);
  var verified = null;

  Account.findOne({
    email: req.body.username
  }, function(err, doc) {

    if (err) {
      res.send(err);
    } else if (doc.email_verified != 'OK') {
      console.log(doc.email_verified);
       res.redirect('/#/verify');
    } else(doc.email_verified == 'OK')
    console.log(doc.email_verified);
    res.redirect('/#/profile');
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res) {
  res.status(200).send("test!");
});


router.get('/verify_email/:token', function(req, res, next) {
  Account.update({
    "email_verified": req.params.token
  }, {
    $set: {
      "email_verified": "OK"
    }
  }, function(err, account) {
    if (err) {
      console.log(err);
    } else {
      //res.render('verified.twig');
       res.redirect('/#/verified');
    }
  });
});



EmailVerif = function(recepient) {
  var transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
      user: 'elycheikh.elmoctarsalem@esprit.tn',
      pass: 'Google2motdepasse'
    }
  });

  var mailOptions = {
    from: ' ElyCheikh El Moctar Salem <elycheikh.elmoctarsalem@esprit.tn>',
    to: recepient,
    subject: 'Email Verification',
    text: 'You need To verificate your email in order to login to CameraKingdom' + ' ... Click on this URi to do so ' + '             ' + 'http://localhost:3000/verify_email/' + token
  };
  console.log(' taraaaaa ' + recepient);

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    } else {
      console.log('Email Sent' + info.response);
    }

  });
}


module.exports = router;

