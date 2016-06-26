var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data')//连接数据库
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


app.get('/login', routes.login);//登录页面
app.post('/postLogin', routes.postLogin);
app.get('/document', routes.document);//编辑页面
// app.get('/list',routes.list)//列表页面
app.get('/list',routes.list)//获取列表
app.post('/list',routes.postList)//获取列表
app.post('/postDocument',routes.postDocument)//保存编辑内容
app.post('/remove',routes.remove)//删除
app.get('/detaile',routes.detaile)//详细内容
app.post('/postDetaile',routes.postDetaile)//详细内容
app.get('/edit',routes.edit)//修改页面
app.post('/postEdit',routes.postEdit)//修改内容
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
