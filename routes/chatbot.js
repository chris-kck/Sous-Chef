var express = require('express');
var router = express.Router();
var spoonacular = require('../lib/spoonacular');

/* GET chatbot route. */
router.get('/', function(req, res, next) {
  res.render('chatbot', { username: req.session.user });
});

/* POST chatbot route. */
router.post('/', function(req, res, next) {
    //api call for conversation
  spoonacular("food/converse", {context:req.session.user, "text": req.body.chatmsg}, function (err, body) {
          if (err) return next(err);
        //console.log(body);
        res.send(body); //answertext +media objects
      });


});

module.exports = router;

