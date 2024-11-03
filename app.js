var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //RUTA PRINCIPAL 
var usersRouter = require('./routes/users');

const bodyParser = require('body-parser'); //esto quiza fue que no respondia al post


var session = require('express-session');//LO ACABO DE PONER

var app = express();
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*OJOOO SIEMPRE TIENE QUE IR EN ESTE APARTADO Y NO HASTA EL FINAL, IMPORTANTE TOMAR EN CUENTA ESTO */
/*CONFIGURA EL MIDDLEWARE CON EL METODO session*/
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));

app.use('/', indexRouter); //PRINCIPAL

app.use('/users', usersRouter);

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
