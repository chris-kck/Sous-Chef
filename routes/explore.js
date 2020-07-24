var express = require('express');
var router = express.Router();
var unirest = require("unirest");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('explore', { username: req.session.user });
});

//Handle search query & render same page, but with results. Nunjucks is amazing :)
router.post('/', function(req, res, next) {
  unirest
      .get("https://api.spoonacular.com/recipes/search")
      .query({"apiKey": "20faf6bbe4074762be9f0c0db3fe9709", "number": 20, "cuisine":req.body.cuisine,
            "query":req.body.recipe, "diet":req.body.diet, "intolerances":req.body.allergens
            })
      .headers({"useQueryString": true})
      .end(function (response) {
        if (response.error) throw new Error(response.error);
        req.searchRes = response.body.results;
        next();
      });
});

router.post('/', function(req, res, next) {
  //run api search query with supplied user parameters.
  //https://api.spoonacular.com/recipes/search?cuisine=<string>&diet=<string>&intolerances=<string>&number=<number>
  console.log(req.body);
  res.render('explore', { username: req.session.user , searchRes: req.searchRes});
});
/*

var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer");

req.query({
  "q": "How much vitamin k is in spinach%3F"
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

*/

module.exports = router;
