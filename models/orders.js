/**
 * Created by RihabK on 03/05/2016.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Order = new Schema({
    transactionId: String,
    orderNumber: String,
    total: String,
    oauthID: String,
    created: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', Order);
