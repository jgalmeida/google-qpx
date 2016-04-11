var async = require('async');
var format = require('util').format;

var qpxService = require('../../../services').qpx;
var mapper = require('./mapper');

module.exports = function(params, callback) {
  var tasks = [
    async.constant(params),
    build,
    fetch,
    map
  ];

  async.waterfall(tasks, after);

  function after(err, data) {
    if (err) {
      return callback(err);
    }

    return callback(null, data);
  }
};

function getMonth(month) {
  var m = month + 1;

  return (String(m).length === 1) ? '0' + m : m;
}

function build(params, next) {
  var sd = new Date(params.start_date);
  var startDate = format('%s-%s-%s', sd.getFullYear(), getMonth(sd.getMonth()), sd.getDate());
  var startTime = format('%s:%s', sd.getHours(), sd.getMinutes());

  var rd = '';
  var returnDate = '';
  var returnTime = '';
  if (params.return_date) {
    rd = new Date(params.return_date);
  } else {
    rd = sd;
  }

  returnDate = format('%s-%s-%s', rd.getFullYear(), getMonth(rd.getMonth()), rd.getDate());
  returnTime = format('%s:%s', rd.getHours(), rd.getMinutes());

  params.origin = params.origin.toUpperCase();
  params.destination = params.destination.toUpperCase();
  params.max_stops = Number(params.max_stops);
  params.adult_count = Number(params.adult_passengers);

  var req = {
    request: {
      slice: [
        {
          origin: params.origin,
          destination: params.destination,
          date: startDate,
          permittedDepartureTime: {
            earliestTime: startTime,
            latestTime: ''
          },
          maxStops: params.max_stops
        },
        {
          origin: params.destination,
          destination: params.origin,
          date: returnDate,
          permittedDepartureTime: {
            earliestTime: returnTime,
            latestTime: ''
          },
          maxStops: params.max_stops
        }
      ],
      passengers: {
        adultCount: params.adult_passengers
      },
      maxPrice: params.max_price_currency + params.max_price
    }
  };

  next(null, req);
}

function fetch(params, next) {
  qpxService(params, function(err, data) {
    if (err) {
      return next(err);
    }

    next(null, data);
  });
}

function map(data, next) {
  next(null, mapper(data));
}
