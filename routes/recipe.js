var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //query particular recipe and render its info
  res.render('recipe', { username: req.session.user });
});

module.exports = router;
