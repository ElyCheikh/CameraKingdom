var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Account = new Schema({
	oauthID: String,
	fullName: String,
    username: String,
    password: String,
    email: String,
    phone : String,
    email_verified : String,
    forgot: String,
    provider: String,
    created: { type: Date, default: Date.now }
   
});
Account.plugin(passportLocalMongoose, {usernameField: "email"});
module.exports = mongoose.model('Account', Account);