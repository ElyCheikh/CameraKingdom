var express = require('express')
var router = express.Router()

/*Express comes with built-in middleware to serve up the static assets
__dirname is a special Node variable that points to the current file’s directory, /controllers in this case
You could also use process.cwd(), which is the current working directory of the Node process, but that has a tendency to change depending on how you start the process
*/
router.use(express.static(__dirname + '/../assets'))

router.get('/', function (req, res) {
  res.sendfile('layouts/posts.html')
})

module.exports = router