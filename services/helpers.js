var request = require('request'); 
var _ = require('lodash');

module.exports = {
  request: doRequest
};

function doRequest(opts, callback) {
  var options = {
    timeout: 10000,
    json: true
  };

  _.extend(options, opts);

  request(options, callback);
};
