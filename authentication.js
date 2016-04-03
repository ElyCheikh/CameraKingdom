var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var Account = require('./models/account');
var config = require('./oauth.js');

module.exports = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    Account.findOne({
      oauthID: profile.id
    }, function(err, account) {
      if (err) {
        console.log(err); // handle errors!
      }
      if (!err && account !== null) {
        done(null, account);
        console.log('token....  ' + accessToken)
      } else {
        account = new Account({
          oauthID: profile.id,
          fullName: profile.displayName,
          username: profile.username,
          email: profile.email,
          provider: 'Facebook'

        });
        account.save(function(err) {
          if (err) {
            console.log(err); // handle errors!
          } else {
            console.log("saving account ...");
            done(null, account);

          }
        });
      }
    });
  }
));

passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    Account.findOne({
      oauthID: profile.id
    }, function(err, account) {
      if (err) {
        console.log(err); // handle errors!
      }
      if (!err && account !== null) {
        done(null, account);
        console.log('token....  ' + accessToken)
      } else {
        account = new Account({
          oauthID: profile.id,
          fullName: profile.displayName,
          username: profile.username,
          email: profile.email,
          provider: 'Github'
        });
        account.save(function(err) {
          if (err) {
            console.log(err); // handle errors!
          } else {
            console.log("saving user ...");
            done(null, account);
          }
        });
      }
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(request, accessToken, refreshToken, profile, done) {
    Account.findOne({
      oauthID: profile.id
    }, function(err, account) {
      if (err) {
        console.log(err); // handle errors!
      }
      if (!err && account !== null) {
        done(null, account);
        console.log('token....  ' + accessToken)
      } else {
        account = new Account({
          oauthID: profile.id,
          fullName: profile.displayName,
          username: profile.username,
          email: profile.email,
          provider: 'Google'
        });
        account.save(function(err) {
          if (err) {
            console.log(err); // handle errors!
          } else {
            console.log("saving user ...");
            done(null, account);
          }
        });
      }
    });
  }
));