var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('favourites', { username: req.session.user });
});

module.exports = router;
