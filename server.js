var express = require('express');
var morgan = require('morgan');
var assert = require('assert');

var resources = require('./resources');

module.exports = function() {
  assert(process.env.QPX_API_KEY, 'QPX_API_KEY must be provided');

  var app = express();
  app.disable('x-powered-by');

  //Logger
  app.use(morgan('common'));

  //Resources
  app.get('/flights', resources.flights.find);

  //Error
  app.use(function(err, req, res, next) {
    var status = err.isBoom ? err.output.statusCode : 500;
    
    console.error(status + ' : ' + err.stack);

    res.status(status).json({
      message: err.message
    });
  });

  return app;
};
