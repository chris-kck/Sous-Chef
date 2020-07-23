var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  req.session.username = req.body.username;
  res.render('cook-zone', { username: req.session.username });
});

module.exports = router;