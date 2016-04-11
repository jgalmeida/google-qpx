var objectMapper = require('object-mapper');
var _ = require('lodash');

var mapTrips = {
  'trips[].tripOption[].saleTotal': '[].price',
  'trips[].tripOption[].slice[0]': '[].start',
  'trips[].tripOption[].slice[1]': '[].return'
};

var mapSegments = {
  'segment[].duration': 'duration',
  'segment[].flight.carrier': '[].carrier',
  'segment[].flight.number': '[].number',
  'segment[].duration': '[].duration',
  'segment[].leg[0].origin': '[].origin',
  'segment[].leg[0].departureTime': '[].departureTime',
  'segment[].leg[0].destination': '[].destination',
  'segment[].leg[0].arrivalTime': '[].arrivalTime',
};

module.exports = function(data) {
  var mappedTrips = objectMapper(data, mapTrips);

  _.each(mappedTrips, function map(trip) {
    trip.start = objectMapper(trip.start, mapSegments);
    trip.return = objectMapper(trip.return, mapSegments);
  });

  return mappedTrips;
};
