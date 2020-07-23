var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cook-zone', { title: req.session.user });
});


module.exports = router;
