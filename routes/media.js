var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var router = express.Router();
var upload = multer({
	dest: 'public/uploads/'
});
var type = upload.single('media');
var Post = require('../models/post');
var Account = require('../models/account');
var path = require('path');

var fs = require('fs');
var randtoken = require('rand-token');
var token = randtoken.generate(32);

router.get('/kanetMedia', function(req, res, next) {
	console.log('passport')
	console.log(req.session.passport);
	res.render('media.twig', {
		arg: 'Upload Media'
	});
});

router.post('/', type, function(req, res, next) {
	var oldPath = req.file.path;
	var newPath = 'public/uploads/' + token + '_' + req.file.originalname;
	//fs.unlinkSync(oldPath);
	fs.renameSync(oldPath, newPath);
	Account.findById(req.session.passport.user,
		function(err, tank) {
			if (err) {
				console.log(err)
			} else {
				console.log('tank')
				console.log(tank);

				post = new Post({
					userId: req.session.passport.user,
					userName: tank.username || tank.email,
					titre: req.body.titre,
					desc: req.body.desc,
					path: 'uploads/' + token + '_' + req.file.originalname,
					mime: req.file.mimetype,
					size: req.file.size
				}).save(function(err, projet) {
					if (err) {
						console.log('add post error');
						res.redirect('/#/error');
					} else {
						console.log('post added!');
						console.log('user : ' + req.session.passport.user);
						res.redirect('/#/');
					}
				});
			}
		});


	/*Post.find({
		path: 'uploads/' + token + '_' + req.file.originalname
	}, function(err, post) {
		if (err) {
			console.log('post not found');
		} else {

			Account.findByIdAndUpdate(req.session.passport.user, {
				$push: {
					posts: post
				}
			}, function(err, tank) {
				if (err) {
					console.log(err)
				} else {
					res.render('media.twig', {
						arg: 'Upload Media'
					});
				}
			});

		}
	});*/

});


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