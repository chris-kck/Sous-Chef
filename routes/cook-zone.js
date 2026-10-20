var express = require('express');
var router = express.Router();
var spoonacular = require('../lib/spoonacular');


//Api Calls and response handling
router.get('/', function(req, res, next) {
    spoonacular("recipes/random", {"number": 32}, function (err, body) {
          if (err) return next(err);
            req.recipes = body.recipes;
            next();
        });
});

router.get('/', function(req, res, next) {
    spoonacular("food/jokes/random", {}, function (err, body) {
          if (err) return next(err);
            req.joke = body.text;
            next();
        });
});


router.get('/', function(req, res) {
    res.render('cook-zone', { username: req.session.user, recipes: req.recipes, joke:req.joke});
});



module.exports = router;
