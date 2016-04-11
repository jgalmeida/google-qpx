var findService = require('./find');

module.exports = {
  find: find
};

function find(req, res, next) {
  findService(req.query, function(err, data) {
    if (err) {
      return next(err);
    }

    var status = data ? 200 : 204;

    res.status(status).json(data);
  });
};
