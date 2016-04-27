var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Media = new Schema({
    titre: String,
    nomfichier: String
});

module.exports = mongoose.model('Media', Media);