var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LYOAUTH = require('lvyii_third_party_oauth')

var oauthRedis = {
  redis_url: '120.77.220.234',
  redis_port: '6379',
  redis_db: '12',
  redis_auth: 'Simors2017',
}

var wechatOauthCfg = {
  channel: 'wechat',
  serverUrl: 'http://hudong-dev.leanapp.cn/wechatOauth',
  appId: 'wx34ac208b373814d2',
  appSecret: 'd121a1921db870cc3e37f148cb7cc257',
}

LYOAUTH.init({
  media: 'redis',
  mediaCfg: oauthRedis,
  thirdParty: [wechatOauthCfg],
})

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(LYOAUTH.express())

app.use('/', index);
app.use('/users', users);

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
