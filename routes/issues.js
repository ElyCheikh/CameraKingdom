var express = require('express');
 var app = express.Router();
//var Issue = require('../models/issue.js');
var mongolian = require('mongolian');
var MONGO_DB = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/CameraKingdom';
//var MONGO_DB = process.env.MONGOHQ_URL || 'mongodb://elycheikh:ely4twin1@ds011379.mlab.com:11379/camerakingdom';

var db = new mongolian(MONGO_DB);
var ObjectId = mongolian.ObjectId;
ObjectId.prototype.toJSON = ObjectId.prototype.toString;





//// JSON API ////
var collection = db.collection("issues")

app.get("/", function(req, res) {
  collection.find().toArray(function(err, issues) {
    res.send(issues);
  })
});

app.get("/:id", function(req, res) {
  collection.findOne({_id: new ObjectId(req.params.id)}, function(err, issue) {
    res.send(issue);
  })
});

app.delete("/:id", function(req, res) {
  collection.remove({_id: new ObjectId(req.params.id)}, function(err) {
    res.send(200);
  })
});

app.post("/", function(req, res) {
  var issue = req.body;
  issue.first.votes = 0;
  issue.second.votes = 0;
  issue.votes = [];
  issue.created = new Date();
  collection.save(issue, function(err, data) {
    res.send(200);
  })
});

app.post("/:id/votes", function(req, res) {
  var vote = req.body;
  vote.created = new Date();
  collection.findOne({_id: new ObjectId(req.params.id)}, function(err, issue) {
    issue.votes.push(vote);
    var option = (issue.first.name == vote.name) ? issue.first : issue.second;
    option.votes++;
    collection.save(issue, function(err, issue) {
      res.send(200);
    })
  })
});




app.post("/login/:username", function(req, res) {
  req.session.username = req.param.username;
  res.send(200);
});

app.get("/login", function(req, res) {
  res.send(req.session.username);
});


module.exports = app;
