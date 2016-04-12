var youtubeAPI = require('youtube-api');
var express = require('express');

var router = express.Router();

var youtubeAPISimplifier = {
    /**
     * The Youtube-API Key which will be used for all Requests.
     *
     * @property {String} _APIKEY
     * @private
     */
    _APIKEY: ' AIzaSyDRFmTiPr3o52cMkb_qEjy6XHou62soAhg ',

    /**
     * Setup function, needs to be called first!
     *
     * @method setup
     * @param  {String}    apiKEY
     */
    setup: function (apiKEY) {
        this._APIKEY = apiKEY;
        youtubeAPI.authenticate({
            type: 'key',
            key: apiKEY
        });
    },

    channelFunctions: require('../lib/channel-functions'),

    playlistFunctions: require('../lib/playlist-functions'),

    searchFunctions: require('../lib/search-functions'),

    videoFunctions: require('../lib/video-functions'),

    activitiesFunctions: require('../lib/activities-functions')
};

var YTAPI = youtubeAPISimplifier;

/* GET home page. */
router.get('/', function(req, res, next) {
    var APIKEY = 'AIzaSyDRFmTiPr3o52cMkb_qEjy6XHou62soAhg';
    YTAPI.setup(APIKEY);
    YTAPI.searchFunctions.channelInternalSearch('AdeleVEVO', '', 10).then(function (data) {
        //res.json(data);
        res.render('youtube/youtube.twig', { title: 'Mes videos youtube' ,videos : data});
    });
    //res.render('index', { title: 'Express' });
});

module.exports = router;