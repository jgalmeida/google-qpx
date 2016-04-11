var qs = require('qs');
var async = require('async');
var request = require('request');
var Boom = require('boom');

var checkSchema = require('./validate');
var qpx = require('./qpx');

module.exports = function(params, callback) {
  var tasks = [
    async.constant(params),
    validate,
    fetch
  ];

  async.waterfall(tasks, after);

  function after(err, data) {
    if (err) {
      return callback(err);
    }

    callback(null, data);
  }
};

function validate(params, next) {
  var validation = checkSchema(params);

  if (validation.error) {
    return next(Boom.badRequest(validation.error));
  }

  next(null, params);
}

function fetch(params, next) {
  var r = {
    qpx: qpx.bind(null, params)
  };

  async.parallel(r, after);

  function after(err, data) {
    if (err) {
      return next(err);
    }

    next(null, data);
  }
}
