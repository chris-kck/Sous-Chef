var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('favourites', { username: req.session.user });
});


//Handler for recipes added to favourites
router.post('/', function(req, res, next) {
  req.session.favourites =  req.session.favourites || []; //itself if it exists else empty list
  req.session.favourites.push( req.body.recID); //push to list of fav recipe objects for session
  res.send("Your recipe has been successfully added");
  console.log(req.session.favourites);
});

module.exports = router;
