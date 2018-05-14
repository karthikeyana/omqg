'use strict';

import http from 'http';
import express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import endpoints from './routes/all-api';
import sio from './socket/io';
import SIO from 'socket.io';
import { Config } from './util/config';

var app = express();

app.set('port', Config.port || 8080);
app.use(bodyParser.json());
app.use(compress());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,' + Object.keys(req.headers).join());
	if (req.method === 'OPTIONS') {
		res.write(':)');
		res.end();
	} else next();
});

endpoints(app);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});

var io = SIO.listen(server);
io.sockets.on('connection', function (socket) {
    sio(io, socket);
});
