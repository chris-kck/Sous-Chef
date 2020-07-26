var express = require('express');
var router = express.Router();

/* Not used */
router.get('/', function(req, res, next) {

  //query particular recipe and render its info
  res.render('recipe', { username: req.session.user });
});

module.exports = router;
