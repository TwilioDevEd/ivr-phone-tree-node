var app = require('./app');
var config = require('./config');

var server = app.listen(config.port, function () {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = server;
