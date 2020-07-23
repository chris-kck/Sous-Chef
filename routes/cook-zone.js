var express = require('express');
var router = express.Router();
var unirest = require('unirest');

var recipes; //list with recipes

router.get('/', function(req, res, next) {

  var request = unirest("GET", "https://api.spoonacular.com/recipes/random");

  request.query({ "apiKey": "20faf6bbe4074762be9f0c0db3fe9709", "number": 12 });

  request.headers({ "useQueryString": true });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    req.recipes = response.body.recipes;
    console.log(req.recipes);
    res.render('cook-zone', { title: req.session.user , recipes: req.recipes});
  });

  //console.log(req.recipes); //undefined? why
  //next();
});


/*



router.get('/', function(req, res, next) {
  //console.log(req.recipes)
  res.render('cook-zone', { title: req.session.user , recipes: req.recipes});
});

*/


module.exports = router;
