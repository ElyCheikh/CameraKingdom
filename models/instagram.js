var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Instagram = new Schema({
    photo: String,
    type: String,
    location: String,
    //tags:
    created: { type: Date, default: Date.now }

});
module.exports = mongoose.model('Instagram', Instagram);