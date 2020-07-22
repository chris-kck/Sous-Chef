var express = require('express');
var router = express.Router();
var unirest = require("unirest");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('explore', { title: 'Express' });
});


var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer");

req.query({
  "q": "How much vitamin c is in 2 oranges%3F"
});

req.headers({
  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  "x-rapidapi-key": "cdfd46f434mshdd74d0813ed3c69p1973cdjsnd2b2b667a055",
  "useQueryString": true
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});



module.exports = router;
