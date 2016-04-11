var Joi = require('joi');
var currencies = require('country-data').currencies;

var schema = Joi.object().keys({
  start_date: Joi.date().format('YYYY-MM-DD HH:MM:SS').required(),
  return_date: Joi.date().format('YYYY-MM-DD HH:MM:SS').allow(''),
  adult_passengers: Joi.number().integer().min(1).required(),
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  max_stops: Joi.number().integer().min(0).required(),
  max_price: Joi.number().integer().min(1).required(),
  max_price_currency: Joi.string().valid(Object.keys(currencies)).required()
});

module.exports = function(data) {
  return Joi.validate(data, schema);
};
