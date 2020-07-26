var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chatbot', { username: req.session.user });
});

router.post('/', function(req, res, next) {
  unirest
      .get("https://api.spoonacular.com/food/converse")
      .query({"apiKey": "20faf6bbe4074762be9f0c0db3fe9709", context:req.session.user, "text": req.body.chatmsg})
      .headers({"useQueryString": true})
      .end(function (response) {
        if (response.error) throw new Error(response.error);
        console.log(response.body); //results?
        res.send(response.body); //answertext +media objects
      });


});

module.exports = router;

