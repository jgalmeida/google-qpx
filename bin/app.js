var app = require('../server')();

var PORT = 8000;

app.listen(PORT, function() {
  console.log('Flights server running on port', PORT);
});
