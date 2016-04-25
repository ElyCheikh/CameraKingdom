var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Contact = new Schema({
    name: String,
    subject: String,
    email: String,
    phone: String,
    text: String,
    created: { type: Date, default: Date.now }

});
module.exports = mongoose.model('Contact', Contact);