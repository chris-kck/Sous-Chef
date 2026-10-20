var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || '20faf6bbe4074762be9f0c0db3fe9709';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sommelier', { username: req.session.user });
});

router.post('/', function(req, res, next) {
  //console.log(req.body.recipe);
    //Check if wine or food query, make relevant API call
  if (req.body.recipe) {
    unirest
        .get("https://api.spoonacular.com/food/wine/pairing")
        .query({"apiKey": SPOONACULAR_API_KEY, "food": req.body.recipe})
        .headers({"useQueryString": true})
        .end(function (response) {
          if (response.error) return next(response.error);
          console.log(response.body); //results?
          res.render('sommelier', { recipeSearch:req.body.recipe, wineRes: response.body.pairedWines, wineText: response.body.pairingText });
        });
  }
  else if (req.body.wine){
    unirest
        .get("https://api.spoonacular.com/food/wine/dishes")
        .query({"apiKey": SPOONACULAR_API_KEY, "wine": req.body.wine})
        .headers({"useQueryString": true})
        .end(function (response) {
          if (response.error) return next(response.error);
            console.log(response.body); //results?
          res.render('sommelier', { wineSearch:req.body.wine, rwineText:response.body.text, winePairings:response.body.pairings  });
        });
  }
  else{
      res.render('sommelier');//Render page without responses - ie no search value entered.
  }

});

module.exports = router;
