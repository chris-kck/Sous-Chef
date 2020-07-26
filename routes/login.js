var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

//Api Calls and response handling after login to render cook-zone view with info
router.post('/', function(req, res, next) {
  unirest
      .get("https://api.spoonacular.com/recipes/random")
      .query({"apiKey": "20faf6bbe4074762be9f0c0db3fe9709", "number": 12})
      .headers({"useQueryString": true})
      .end(function (response) {
        if (response.error) throw new Error(response.error);
        req.recipes = response.body.recipes;
        next();
      });

});



router.post('/', function(req, res, next) {
    unirest
        .get("https://api.spoonacular.com/food/jokes/random")
        .query({"apiKey": "20faf6bbe4074762be9f0c0db3fe9709"})
        .headers({"useQueryString": true})
        .end(function (response) {
            if (response.error) throw new Error(response.error);
            req.joke = response.body.text;
            next();
        });
});


router.post('/', function(req, res, next) {
  req.session.user = req.body.username;
  res.render('cook-zone', { username: req.session.user, recipes: req.recipes , joke:req.joke});
});

module.exports = router;
