var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require( './routes/index' );
var users = require( './routes/users' );
var auth = require( './routes/auth' );
var proveedor = require( './routes/proveedor' );
var tipoempleado = require( './routes/tipoempleado' );
var tipoproducto = require( './routes/tipoproducto' );
var empleado = require( './routes/empleado' );
var producto = require( './routes/producto' );
var nivel = require( './routes/nivel' );
var subnivel = require( './routes/subnivel' );
var procesominero = require( './routes/procesominero' );
var presupuesto = require( './routes/presupuesto' );
var categoria = require( './routes/categoria' );
var vale = require( './routes/vale' );
var cuenta = require( './routes/cuenta' );

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( '/', index );
app.use( '/user', users );
app.use( '/auth', auth );
app.use( '/proveedor', proveedor );
app.use( '/tipoempleado', tipoempleado );
app.use( '/tipoproducto', tipoproducto );
app.use( '/empleado', empleado );
app.use( '/producto', producto );
app.use( '/nivel', nivel );
app.use( '/subnivel', subnivel );
app.use( '/procesominero', procesominero );
app.use( '/presupuesto', presupuesto );
app.use( '/categoria', categoria );
app.use( '/vale', vale );
app.use( '/cuenta', cuenta );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
