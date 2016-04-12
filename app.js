var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var randtoken = require('rand-token');
var fbAuth = require('./authentication.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var Account = require('./models/account');
var config = require('./oauth.js');
var routes = require('./routes/index');
var instagram = require('./routes/instagram');
var youtube = require('./routes/youtube');
var users = require('./routes/users');
//var tweets = require('./routes/tweets');
var ig = require('instagram-node').instagram();
var app = express();
var multer = require('multer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// test me / amine kacem
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(require('express-session')({
  secret: 'atelier 8',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());

passport.serializeUser(function(Account, done) {
  console.log('serializeUser: ' + Account._id);
  done(null, Account._id);
});
passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, Account) {
    console.log(Account);
    if (!err) done(null, Account);
    else done(err, null);
  });
});



mongoose.connect('mongodb://localhost/CameraKingdom');


// upload //sofien
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  console.log("hello sof");
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });
});

app.options('/upload', function(req, res) {
  console.log("hello sof2");
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });
});
//

app.use('/', routes);
app.use('/users', users);
//app.use('/tweets', tweets);
app.use('/instagram', instagram);
app.use('/youtube', youtube);
////////////////////////////////////////////////////////////
app.get('/account', ensureAuthenticated, function(req, res) {
  console.log('cooooooooooooooooool');
  Account.findById(req.session.passport.user,
   function(err, account) {
    if (err) {
      console.log(err); // handle errors
      console.log('lllllllllllllllllllllllllllllllllllllllllll')
    } else {
      console.log('user..  ' + account.fullName +''+ account.username);
      console.log(' xxxxxxxx   '+req.session.passport.user);
      //////  node  /////
      /*res.render('account.twig', {
        account: account
      });*/
      //////////////////node///////

      res.json(account); //// angular

    }
  });
});



///////////////////////  Facebook /////////////////////////////////////
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res) {});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/#/profile'); //     /#/profile  /account
  });
//////////////////////////   GitHub ///////////////////////////
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/profile'); //         /account   /#/profile
  });
////////////////////////   Google  ////////////////////////////
app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }
));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/profile');
  });
///////////////////////////////////////////////////////////
function ensureAuthenticated(req, res, next) {
  console.log('authentification');
  if (req.isAuthenticated()) {
    console.log('is authentificated');
    return next();
  }
  res.redirect('/');
}

///////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//added by rihab

module.exports = app;
