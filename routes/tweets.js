var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Twit = require('twit');
var config = require('../config.twitter');
var Tweet = require('../models/tweet.js');

// instantiate Twit module
var twitter = new Twit(config.twitter);

var TWEET_COUNT = 15;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';

//mongoose.connect('mongodb://localhost:27017/mongooseTwitterDB');

/**
 * GET tweets json.
 */
router.get('/searchtweets/:user', function(req, res) {

  var oEmbedTweets = [], tweets = [],

  params2 = {
    screen_name:  req.params.user, // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };

  // the max_id is passed in via a query string param
  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data
  twitter.get('search/tweets', { q: 'photographe since:2011-07-11', count: 100 }, function (err, data, resp) {
    tweets = data;
	//console.log('search tweets');
//console.log(tweets);
  //  console.log(tweets);

    var i = 0, len = tweets.length;

    for(i; i < len; i++) {
      getOEmbed(tweets[i]);
    }
  });

  /**
   * requests the oEmbed html
   */
  function getOEmbed (tweet) {

    // oEmbed request params
    var params = {
      "id": tweet.id_str,
      "maxwidth": MAX_WIDTH,
      "hide_thread": true,
      "omit_script": true
    };

    // request data
    twitter.get(OEMBED_URL, params, function (err, data, resp) {
      console.log(data);
      tweet.oEmbed = data;
      oEmbedTweets.push(tweet);

      // do we have oEmbed HTML for all Tweets?
      if (oEmbedTweets.length == tweets.length) {
        res.setHeader('Content-Type', 'application/json');
        res.send(oEmbedTweets);
      }
    });
  }
});

/**
 * GET tweets json.
 */
router.get('/user_timeline/:user', function(req, res) {

  console.log("in user timeline");
  var oEmbedTweets = [], tweets = [],

  params = {
    screen_name: req.params.user, // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };

  // the max_id is passed in via a query string param
  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data
  twitter.get(USER_TIMELINE_URL, params, function (err, data, resp) {

    tweets = data;

    var i = 0, len = tweets.length;
    //console.log(tweets.user.id);
    for(i; i < len; i++) {
     console.log(tweets[i].user.id);

      new Tweet({
        fullName: tweets[i].user.name + ''+ tweets[i].user.screen_name,
        description : tweets[i].user.description,
        followers_count:  tweets[i].user.followers_count,
        friends_count: tweets[i].user.friends_count
      })
          .save(function(err, Tweet) {
            if(err){
              console.log(err);
            }else{
              console.log('Saved Succcesfully');
            }
          });



      getOEmbed(tweets[i]);
    }

    Tweet.find(function(err, list) {
      if (err) {
        console.log(err);
      } else {
        console.log('Cool');
        console.log(list);
      }

    });
  });

  /**
   * requests the oEmbed html
   */
  function getOEmbed (tweet) {

    // oEmbed request params
    var params = {
      "id": tweet.id_str,
      "maxwidth": MAX_WIDTH,
      "hide_thread": true,
      "omit_script": true
    };

    // request data
    twitter.get(OEMBED_URL, params, function (err, data, resp) {
      tweet.oEmbed = data;
      oEmbedTweets.push(tweet);

      // do we have oEmbed HTML for all Tweets?
      if (oEmbedTweets.length == tweets.length) {
        res.setHeader('Content-Type', 'application/json');
        res.send(oEmbedTweets);
      }
    });
  }
});

module.exports = router;
