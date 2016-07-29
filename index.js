var express = module.exports = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var counter = require('./routes/index');
var users = require('./routes/users');
var hits = require('./routes/hits');
var auth = require('./auth/auth');

var app = module.exports = express();

// config

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// middleware

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', auth);
app.use('/counter', counter);
app.use('/users', users);
app.get('/hits', hits.count);
app.post('/hit', hits.registerNew);

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  var now = new Date();
  var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  console.log('Express started on port 3000, time:', time);
}
