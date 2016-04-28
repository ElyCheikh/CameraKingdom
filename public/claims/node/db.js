var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/CameraKingdom', function () {
  console.log('mongodb connected')
})
module.exports = mongoose