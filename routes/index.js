var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var email = require('emailjs');
var flash = require('connect-flash');

var token = randtoken.generate(32);

router.get('/tweets', function(req, res, next) {
  res.render('twitter/index2.ejs', {
    user: req.user
  });
});

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
      phone: req.body.phone,
      email_verified: token,
      forgot: 'null'
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



router.get('/forgotPassword', function(req, res, next) {
  res.render('auth/forgot.twig', {
    arg: 'Frogot'
  })
});

router.post('/action_pass_forgot', function(req, res, next) {
  console.log(req.body.groupe1);
  if (req.body.groupe1 == 'email') {
    res.render('auth/email_pass_forgot.twig', {
      arg: 'email'
    });
  }
  if (req.body.groupe1 == 'sms') {
    res.render('auth/tel_pass_forgot.twig', {
      arg: 'sms'
    });
  }

});


router.post('/send_email_forgot', function(req, res, next) {

  if (req.body.email) {
    console.log('hhhhhh' + ' ' + req.body.email);
    passRecoverByEmail(req.body.email);
    Account.update({
      "email": req.body.email
    }, {
      $set: {
        "forgot": token
      }
    }, function(err, account) {
      if (err) {
        console.log(err);
      } else {
        console.log(account);

      }
    });
    res.render('auth/email_pass_forgot.twig', {
      arg: 'bla'
    });
  } else {
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});


router.post('/ResetPassword', function(req, res, next) {

  console.log(req.body.pass);
  console.log(req.body.conf);
  console.log(req.body.token);

  Account.findOne({
    forgot: req.body.token
  }, function(err, account) {
    if (err) {
      console.log('error 1');
      console.log(err)
    } else {
      console.log(account);
      var phone = account.phone;
      var username = account.username;
      var email = account.email;
      var email_verified = account.email_verified;
      var forgot = 1;
      Account.findByIdAndRemove(account._id, function(err) {
        if (err) {
          console.log('error 2');
          console.log(err)
        } else {
          console.log('deleted')
            //////////////////////////
          Account.register(new Account({
              username: username,
              email: email,
              phone: phone,
              email_verified: email_verified,
              forgot: forgot
            }),
            req.body.pass,
            function(err, account) {
              if (err) {
                console.log('error 3');
                console.log(err);
              } else {


                var accountSid = 'AC43f6305cf20964c0ee14f4431c6e951c';
                var authToken = '74d439142fba6fb68d852ab92d551be2';

                //require the Twilio module and create a REST client 
                var client = require('twilio')(accountSid, authToken);

                client.messages.create({
                  from: "+12023356498",
                  to: phone,
                  body: "Your New Passwrd: "+ req.body.pass
                }, function(err) {
                  //console.log(message.sid); 
                  console.log('++++++++++++++++++++++++++');
                  console.log(err);
                });



                res.redirect('/login');
              }
            });
          //////////////////////////
        }
      });
    }
  });

});

router.get('/pass_recovery_email/:token', function(req, res, next) {

  res.render('auth/passsConfirm.twig', {
    arg: req.params.token
  });
});

passRecoverByEmail = function(recepient) {
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
    subject: 'Password Recovery',
    text: 'Click on this URI to Change your Password ' + 'http://localhost:3000/pass_recovery_email/' + token
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