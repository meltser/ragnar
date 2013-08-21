/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//var main = app.resource(require('./controllers/main'));
//var torrents = app.resource('torrents', require('./controllers/torrent'));
app.get('/', function (req, res) {
    res.send("Hello from Ragnar");
});
app.get('/user/:hash', function (req, res) {
    console.log(req.params.hash);
    res.send(req.params.hash);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
