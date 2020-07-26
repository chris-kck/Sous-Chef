var express = require('express');
var router = express.Router();
var unirest = require("unirest");


//Call Trivia despite http vert (post/get)
router.all('/', function(req, res, next) {
    unirest
        .get("https://api.spoonacular.com/food/trivia/random")
        .query({"apiKey": "20faf6bbe4074762be9f0c0db3fe9709"})
        .headers({"useQueryString": true})
        .end(function (response) {
            if (response.error) throw new Error(response.error);
            req.trivia = response.body.text;
            console.log(req.trivia);
            next();
        });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('explore', { username: req.session.user, trivia: req.trivia });
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
  //console.log(req.body); //what's been searched
    console.log(req.searchRes);
  res.render('explore', { username: req.session.user , searchRes: req.searchRes, trivia: req.trivia});
});


module.exports = router;
