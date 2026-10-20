var express = require('express');
var router = express.Router();
var spoonacular = require('../lib/spoonacular');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sommelier', { username: req.session.user });
});

router.post('/', function(req, res, next) {
  //console.log(req.body.recipe);
    //Check if wine or food query, make relevant API call
  if (req.body.recipe) {
    spoonacular("food/wine/pairing", {"food": req.body.recipe}, function (err, body) {
          if (err) return next(err);
          console.log(body); //results?
          res.render('sommelier', { recipeSearch:req.body.recipe, wineRes: body.pairedWines, wineText: body.pairingText });
        });
  }
  else if (req.body.wine){
    spoonacular("food/wine/dishes", {"wine": req.body.wine}, function (err, body) {
          if (err) return next(err);
            console.log(body); //results?
          res.render('sommelier', { wineSearch:req.body.wine, rwineText:body.text, winePairings:body.pairings  });
        });
  }
  else{
      res.render('sommelier');//Render page without responses - ie no search value entered.
  }

});

module.exports = router;
