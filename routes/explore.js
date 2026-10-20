var express = require('express');
var router = express.Router();
var spoonacular = require('../lib/spoonacular');


//Call Trivia despite http vert (post/get)
router.all('/', function(req, res, next) {
    spoonacular("food/trivia/random", {}, function (err, body) {
          if (err) return next(err);
            req.trivia = body.text;
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
    //Check if video checkbox is ticked
    if(req.body.video) {
        spoonacular("food/videos/search", {"number": 40, "cuisine": req.body.cuisine,
                "query": req.body.recipe, "diet": req.body.diet}, function (err, body) {
          if (err) return next(err);
                req.vidsearchRes = body.videos;
                next();
            });

    }
    else{
        spoonacular("recipes/search", {"number": 40, "cuisine": req.body.cuisine,
                "query": req.body.recipe, "diet": req.body.diet, "intolerances": req.body.allergens}, function (err, body) {
          if (err) return next(err);
                req.searchRes = body.results;
                next();
            });
    }


});



router.post('/', function(req, res, next) {
    console.log(req.body);
  //run api search query with supplied user parameters.
  //https://api.spoonacular.com/recipes/search?cuisine=<string>&diet=<string>&intolerances=<string>&number=<number>
  //console.log(req.body); //what's been searched
    console.log(req.searchRes);
  res.render('explore', { username: req.session.user , searchRes: req.searchRes, vidsearchRes:req.vidsearchRes, trivia: req.trivia});
});


module.exports = router;
