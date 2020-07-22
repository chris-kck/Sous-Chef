var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var session = require('express-session');

//Middleware Routes
var indexRouter = require('./routes/index');
var cook_laterRouter = require('./routes/cook-later');
var exploreRouter = require('./routes/explore');
var favouritesRouter = require('./routes/favourites');
var meal_planRouter = require('./routes/meal-plan');
var profile_Router = require('./routes/profile');


//Initialize Express Application
var app = express();

// view engine setup njucks with jinja2-similar formatting. using .htm suffix
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'htm'); //file extension
nunjucks.configure('views', {
  express: app,
  autoescape: true
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({name:"sid", sameSite:true, resave: true, saveUninitialized: true, secret: 'ABRACADABRA2!ABRACADABRA', cookie: { maxAge: 3600000 }}));
app.use(express.static(path.join(__dirname, 'public')));

//Use the route paths below
app.use('/', indexRouter);
app.use('/cook-later', cook_laterRouter);
app.use('/explore', exploreRouter);
app.use('/favourites', favouritesRouter);
app.use('/meal-plan', meal_planRouter);
app.use('/profile', profile_Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
