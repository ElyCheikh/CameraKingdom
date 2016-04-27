var express = require('express');
var Post = require('../models/post');
var Account = require('../models/account');
var Tara = require('../models/tara');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/hisProfile', function(req, res, next) {

	console.log('angular is here');
	console.log(req.query.his);
	Account.findById(req.query.his, function(err, hisProfile) {

		if (err) {
			console.log(err);
		} else {
			console.log('cool');
			Post.find({
				userId: req.query.his
			}, function(err, hisPosts) {
				if (err) {
					console.log(err);
				} else {
					var result = {};
					result.profile = hisProfile;
					result.posts = hisPosts;
					res.json(result);
				}
			});
		}
	});



});

router.get('/AllPosts', function(req, res, next) {

	Post.find().exec(function(err, posts) {
		if (err) {
			console.log('failure finding all Posts');
			console.log(err);
		} else {
			console.log('success finding All posts');
			console.log(posts);
			res.json(posts);
		}
	});
});

router.get('/postFollowed', function(req, res, next){
	var fp = [];
	Account.findById(req.session.passport.user, function (err, account) {
		 if(err){
		 	console.log('folowed 1');
		 	console.log(err);
		 }else{
		 	var list = [];
		 	for (var i = 0; i < account.folowing.length; i++) {
		 		list.push (account.folowing[i].user);
		 	};
		 	console.log('list folowing ((((((((((((((((((((((((((((');
		 	console.log(list);
		 	
		 	for (var i = 0; i < list.length; i++) {
		 		console.log(list[i]);
		 		Post.find({
		 			userId : list[i]
		 		},function (err, post) {
		 			if(err){
		 				console.log('err ')
		 				console.log(err);
		 			}else{
		 				//console.log(post)
		 				fp.push(post);
		 				console.log(fp);
		 				res.json(fp);
		 				

		 			}
		 		});
		 	}
		 	//res.json(fp);
		 }
	});
});	

router.post('/idToFollow', function(req, res, next) {
	console.log(req.query.his);
	Account.findById(req.query.his, function (err, account) {
			account.folowers.push( { user: req.session.passport.user } );
			account.save(function (err) {
				 if(err){
				 	console.log(err);
				 }
			});
	});
	Account.findById(req.session.passport.user, function (err, account) {
			account.folowing.push( { user: req.query.his } );
			account.save(function (err) {
				 if(err){
				 	console.log(err);
				 }
			});
	});
});

module.exports = router;