var express = require('express');
var router = express.Router();
var unirest = require('unirest');






router.get('/', function(req, res, next) {
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



router.get('/', function(req, res) {
    res.render('cook-zone', { title: req.session.user , recipes: req.recipes});
});



module.exports = router;
