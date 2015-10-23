var expressIO = require('express.io'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    extend = require('util')._extend;

var app = expressIO(),
    folder = process.argv[2] !== 'debug' ? 'build' : 'app';

app.use(expressIO.cookieParser());
app.use(expressIO.session({secret: 'monkey'}));
app.use(expressIO.bodyParser());

app.http().io();
app.listen(8000);

var ws = require("nodejs-websocket");

var companions = [];

var server = ws.createServer(function (conn) {
    conn.on("text", function (response) {
        console.log("Received " + response);

        if (response.indexOf(':all:') >= 0) {
            conn.sendText(":all:" + JSON.stringify(companions));
        }
        else if (response.indexOf(':newOne:') >= 0) {
            var userStr = response.slice(":newOne:".length);
            var newUser = JSON.parse(userStr);
            companions.push(newUser);
            conn.sendText(":newOne:" + JSON.stringify(newUser));
        }
        else if (response.indexOf(':logout:') >= 0) {
            var userName = response.slice(":logout:".length);
            companions = companions.filter(function(el) {
                return el.name != userName;
            });
            conn.sendText(":logout:" + userName);
        }
        else if (response.indexOf(':msg:') >= 0) {
            conn.sendText(response);
        }
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(8001);

// Session is automatically setup on initial request.
app.get('/', function(req, res) {
    req.session.loginDate = new Date().toString();
    res.sendfile(__dirname + '/' + folder + '/index.html');
});
app.get('/templates/{name}', function(req, res) {
    res.sendfile(__dirname + '/' + folder + '/templates/' + req.name);
});
app.use(expressIO.static(__dirname + '/'));
app.use(expressIO.static(__dirname + '/' + folder));

exports = module.exports = app;
