var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  //request information for fav recipes and return list of recipes marked as favourites
  if (req.session.favourites != undefined){ //only call if favourites have been added.
    var recipesCSV = req.session.favourites.join(",");

    unirest
        .get("https://api.spoonacular.com/recipes/informationBulk")
        .query({"apiKey": "20faf6bbe4074762be9f0c0db3fe9709","ids": recipesCSV })
        .headers({"useQueryString": true})
        .end(function (response) {
          if (response.error) throw new Error(response.error);
          console.log(response.body);
          req.favRecipes = response.body;
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
