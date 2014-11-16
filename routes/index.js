var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title : 'Basic REST API',
                        message : 'Instructions will be added soon!' });
});

module.exports = router;
