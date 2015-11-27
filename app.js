
/**
 * Module dependencies.
 */

var express = require('express');
var twilio = require('twilio');
var ivr = require('./routes/ivr');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', ivr.index);
app.post('/ivr/welcome', twilio.webhook({ validate: false }), ivr.welcome);
app.post('/ivr/menu', twilio.webhook({ validate: false }), ivr.menu);
app.post('/ivr/planets', twilio.webhook({ validate: false }), ivr.planets);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
