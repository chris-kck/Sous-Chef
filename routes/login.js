var express = require('express');
var router = express.Router();
var spoonacular = require('../lib/spoonacular');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

//Api Calls and response handling after login to render cook-zone view with info
router.post('/', function(req, res, next) {
  spoonacular("recipes/random", {"number": 12}, function (err, body) {
          if (err) return next(err);
        req.recipes = body.recipes;
        next();
      });

});



router.post('/', function(req, res, next) {
    spoonacular("food/jokes/random", {}, function (err, body) {
          if (err) return next(err);
            req.joke = body.text;
            next();
        });
});


router.post('/', function(req, res, next) {
  req.session.user = req.body.username;
  res.render('cook-zone', { username: req.session.user, recipes: req.recipes , joke:req.joke});
});

module.exports = router;
