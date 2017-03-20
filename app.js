var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require('fs');

require('./app_api/models/db');

var routesApi = require('./app_api/routes/index');

var app = express();

app.set('port',process.env.PORT || 4000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var appClientFiles = [
  '/home/pushint/sitePUSH/app_client/sitePUSH.js',
  '/home/pushint/sitePUSH/app_client/home/home.controller.js',
  '/home/pushint/sitePUSH/app_client/portfolio/portfolio.controller.js',
  '/home/pushint/sitePUSH/app_client/team/team.controller.js',
  '/home/pushint/sitePUSH/app_client/reel/reel.controller.js',
  '/home/pushint/sitePUSH/app_client/contacts/contacts.controller.js',
  '/home/pushint/sitePUSH/app_client/timeline/timeline.controller.js',
  '/home/pushint/sitePUSH/app_client/news/news.controller.js',
  '/home/pushint/sitePUSH/app_client/projects/projects.controller.js',
  '/home/pushint/sitePUSH/app_client/disclaimer/disclaimer.controller.js',
  '/home/pushint/sitePUSH/app_client/lab/lab.controller.js',
  '/home/pushint/sitePUSH/app_client/career/career.controller.js',
  '/home/pushint/sitePUSH/app_client/whatwedo/whatwedo.controller.js',
  '/home/pushint/sitePUSH/app_client/category/category.controller.js',
  '/home/pushint/sitePUSH/app_client/common/directives/pageHeader/pageHeader.directive.js',
  '/home/pushint/sitePUSH/app_client/common/directives/pageFooter/pageFooter.directive.js',
  '/home/pushint/sitePUSH/app_client/common/services/getData.service.js',
  '/home/pushint/sitePUSH/app_client/common/services/saveNewsId.service.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/sitePUSH.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'pushSITE.min.js');
  }
});

app.use(express.static(__dirname + '../public'));


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/api', routesApi);
/*app.use(function(req,res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});*/

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

var server = app.listen(app.get('port'),function(){
	console.log('Ready on port' , server.address().port);
});


module.exports = app;
