var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Overview with links to the single emails would go here.');
});

module.exports = router;
