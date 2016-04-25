/**
 * Created by RihabK on 25/04/2016.
 */
// Require the module
var express = require('express');
var Twocheckout = require('2checkout-node');
var router = express.Router();
// Pass in your private key and seller ID
var tco = new Twocheckout({
    sellerId: "901315869",
    privateKey: "B4B3D8C6-E020-4C95-A651-B22DBC29B34F",
 sandbox: true
});
var params = {
    "merchantOrderId": "123",
    "token": "MWQyYTI0ZmUtNjhiOS00NTIxLTgwY2MtODc3MWRlNmZjY2Jh",
    "currency": "USD",
    "total": "10.00",
    "billingAddr": {
        "name": "Testing Tester",
        "addrLine1": "123 Test St",
        "city": "Columbus",
        "state": "Ohio",
        "zipCode": "43123",
        "country": "USA",
        "email": "test@2co.com",
        "phoneNumber": "102885523"
    }
};
router.post('/pay', function(req, res) {
console.log('msg test sof : '+req.body.token);
 params.token=   req.body.token;
    params.ccNo=req.body.ccNo;
    params.expMonth=req.body.expMonth;
    params.expYear=req.body.expYear;
    params.cvv=req.body.cvv;
    tco.checkout.authorize(params, function (error, data) {
        if (error) {
            console.log('payment error 1:'+error.message);
        } else {
            console.log(JSON.stringify(data));
        }
    });
});

module.exports = router;
