/**
 * Created by RihabK on 12/04/2016.
 */
var express = require('express');
var http = require('http');
var router = express.Router();

var ig = require('instagram-node').instagram();
//user_id hamdi : 278199g704\
ig.use({ client_id: '88092373fad24e649152152430554170',
    client_secret: '71bfc26f83124a668792c029b6a2ad96' });
ig.use({ access_token: '224236382.1677ed0.7ce35479a1ab4a678a43ef3c5c6fe637' });

/* Les medias populaires */
router.get('/p', function(req, res, next) {
    ig.media_popular(function(err, medias, remaining, limit) {
        res.json(medias);
    });

});

/* Les photos que j'ai lik\'e9' */
router.get('/user_self', function(req, res, next) {
    ig.user_self_liked(function(err, medias, pagination, remaining, limit) {
        //res.render('insta.twig',\{medias:medias\})\
        res.json(medias) ;
    });

});
// les followers du l'utilisateur ( Abonnements)\
router.get('/followers', function(req, res, next) {
    ig.user_follows('278199704', function(err, users, pagination, remaining, limit) {
        res.json(users);
    });
});


// les followers (users) du l'utilisateur ( friends abonnement )\
router.get('/followers_user', function(req, res, next) {
    ig.user_relationship('278199704', function(err, result, remaining, limit) {
        res.json(result) ;
    });
});

/* Les commentaires d'une photo  */
router.get('/comments', function(req, res, next) {
    ig.comments('1202370110940660754_1458367704', function(err, result, remaining, limit) {
        res.json(result) ;
    });

});

/* Les photos que j'ai lik\'e9' */
router.get('/tag_media', function(req, res, next) {
    ig.tag_media_recent('disney',function(err, medias, pagination, remaining, limit) {
        res.json(medias);
    });

});


/* Les photos d'une position L A */
router.get('/position', function(req, res, next) {
    ig.media_search(0.45158362, 0.22777778,  function(err, medias, remaining, limit) {
        res.json(medias) ;
    });
});

/* Mes abonnements */
router.get('/subs', function(req, res, next) {
    ig.subscriptions(function(err, subscriptions, remaining, limit){
        res.json(subscriptions) ;
    });

});

/*Mes photos*/
router.get('/', function(req, res, next) {
    ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
        // res.json(medias) ;
        res.render('instagram/instagram.twig', { title: 'Mes publications en instagram', publications: medias });
    });

});
router.get('/json', function(req, res, next) {
    ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
        // res.json(medias) ;
        
        
        res.render('instagram/json.twig', { title: 'Mes publications en instagram', publications: res.json(medias) });
    });

});
/*tagsSearch*/
router.get('/searchByTag', function(req, res, next) {
    ig.tag_media_recent('esprit',function(err, medias, pagination, remaining, limit) {});

    ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {});
});

module.exports = router;

