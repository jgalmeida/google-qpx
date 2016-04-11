var Boom = require('boom');

var helpers = require('../helpers');

var key = process.env.QPX_API_KEY;
var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search';

module.exports = function(params, callback) {
  var opts = {
    url:  url + '?key=' + key,
    method: 'POST',
    body: params
  };

  helpers.request(opts, function(err, res) {
    if (err) {
      return next(Boom.badImplementation(err.message));
    }

    if (res.statusCode >= 400) {
      console.log('[Error in QPX request]', res.body.error.errors)
      return callback(Boom.badRequest('Error in QPX request (Invalid key, params)'));
    }

    if (res.statusCode !== 200) {
      return callback(null);
    }

    //callback(null, require('../../docs/OGGNCE.out'));
    callback(null, res.body);
  });
};
