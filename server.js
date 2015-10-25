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
            conn.user = newUser;
            broadcast(response);
        }
        else if (response.indexOf(':msg:') >= 0) {
            broadcast(response);
        }
    });

    conn.on("close", function (code, reason) {
        companions = companions.filter(function(el) {
            return el.name != conn.user.name;
        });
        broadcast(':logout:' + conn.user.name);
    });
}).listen(8001);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}

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
