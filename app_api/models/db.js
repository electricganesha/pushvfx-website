var mongoose = require('mongoose');
var gracefulShutdown;

var dbURI = 'mongodb://localhost/sitePUSH';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function()
{
      console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err)
{
      console.log('Mongoose connection error  ' + err);
});

mongoose.connection.on('disconnected', function()
{
      console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback)
{
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

/*
 * Listen for SIGUSR2 - nodemon sig
 */
process.once('SIGUSR2', function()
{
  gracefulShutdown('nodemon restart', function()
  {
    process.kill(process.pid,'SIGUSR2');
  });
});

/*
 * Listen for SIGINT - emmited on application termination
 */
process.on('SIGINT', function()
{
  gracefulShutdown('app termination', function()
  {
    process.exit(0);
  });
});

/*
 * Listen for SIGTERM - emmited when the server shuts down the process
 */
process.on('SIGTERM', function()
{
  gracefulShutdown('app shutdown', function()
  {
    process.exit(0);
  });
});

require('./projects');
require('./news');
require('./team');
require('./lab');
require('./structuralInfo');
require('./reel');
require('./career');
