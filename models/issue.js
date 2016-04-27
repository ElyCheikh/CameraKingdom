var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Issue = new Schema({
 
Options:{
  name: String,
  votes: Number
},

Vote: {
  username: String,
  option: String,
  created: Date
},

Issue :{
  first: Option,
  second: Option,
  votes: [Vote],
  created: Date
}

})
module.exports = mongoose.model('Issue', Issue);