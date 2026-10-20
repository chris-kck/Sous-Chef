var express = require('express');
var router = express.Router();
var spoonacular = require('../lib/spoonacular');

/* GET home page. */
router.get('/', function(req, res, next) {
  //request information for fav recipes and return list of recipes marked as favourites
  if (req.session.favourites != undefined){ //only call if favourites have been added.
    var recipesCSV = req.session.favourites.join(",");

    spoonacular("recipes/informationBulk", {"ids": recipesCSV}, function (err, body) {
          if (err) return next(err);
          console.log(body);
          req.favRecipes = body;
          res.render('favourites', { favRecipes: req.favRecipes, username: req.session.user });

        });
  }
  else { res.render('favourites', {username: req.session.user});}
});


//Handler for recipes added to favourites via ajax call.
router.post('/', function(req, res, next) {
  req.session.favourites =  req.session.favourites || []; //itself if it exists else empty list
  req.session.favourites.push( req.body.recID); //push to list of fav recipe objects for session
  res.send("Your recipe has been added to the Favourites Tab");
  console.log(req.session.favourites);
});

module.exports = router;
