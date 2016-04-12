var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Tweet = new Schema({
    fullName: String,
    description: String,
    followers_count: String,
    friends_count: String,
    created: { type: Date, default: Date.now }

});
module.exports = mongoose.model('Tweet', Tweet);