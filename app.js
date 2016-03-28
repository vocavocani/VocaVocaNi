var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // assets
app.use(express.static(path.join(__dirname, 'build')));  // webpack build .js file

// initialize routes
app.use((req, res, next) => {
  req.path.indexOf('api') != -1 ?
    next() :
    res.render("index");
});
require('./server/routes/api').initApp(app);

// Server Port Set
var http = require('http');
app.set('port', 3000); //3000번 포트로 지정
var server = http.createServer(app);
server.listen(app.get('port'));
console.log('[WordStudy] Application Listening on Port 3000');

module.exports = app;