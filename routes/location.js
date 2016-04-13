var express = require('express');
var router = express.Router();
var express = require('express');
var mongodb = require('mongodb');
/*
 router.use(express.static(__dirname + '/public'));
 */
//ENABLE CORS
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


//LOCATE CODE HERE

router.get('/', function(req, res) {
    //getting the ip of the client from the request headers or remoteAddress
    var ip = req.param("ip");
    ip = ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    var net = ip.split(".").slice(0,3).join(".")+".0"; //aaa.bbb.ccc.0
    console.log(ip);
    console.log(net);

    mongodb.connect("mongodb://127.0.0.1:27017/CameraKingdom",function(err,db){
        if(err) throw err;

        var ips = db.collection("ips");

        ips.findOne({$or: [{ip: net}]},function(err,result){
            if(err) throw err;

            if(result) {

                res.end(JSON.stringify({ip: ip,location: result.location}));

            } else {

                res.end(JSON.stringify({ip: ip}));

            }

            db.close();
        });

    });

});

module.exports = router;
