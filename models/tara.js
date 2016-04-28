var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Tara = new Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    titre: String,
    desc: String,
    path: String,
    mime: String,
    size: String,
    created: { type: Date, default: Date.now }

});
module.exports = mongoose.model('Tara', Tara);

