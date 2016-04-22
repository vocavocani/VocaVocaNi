'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

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

// RESTful api confirm
app.use((req, res, next) => {
  req.path.indexOf('api') != -1 ?
    next() :
    res.render("index");
});

// initialize routes
require('./server/routes/api').initApp(app);

/*******************
 *  Exception decide err_code
 *  1 = Invalid parameter
 ********************/
app.use((err_code, req, res, next) => {
  if(err_code == 1) {
    return res.json({
      "status": 0,
      "error": {
        "code": 1,
        "message": "invalid parameter"
      }
    })
  }
});

// Server Port Set
const http = require('http');
app.set('port', 3000); //3000번 포트로 지정
const server = http.createServer(app);
server.listen(app.get('port'));
console.log('[WordStudy] Application Listening on Port 3000');

module.exports = app;