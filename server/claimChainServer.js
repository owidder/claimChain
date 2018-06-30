const express = require('express');
const http = require('http');

const eventServer = require('./eventServer');

function startServer() {
    const httpPort = process.argv[3] || 1338;
    const folder = process.argv[2] || '../bctron-client/build';

    const app = express();
    const absFolder = __dirname + '/' + folder;
    app.use('/', express.static(absFolder));

    http.createServer(app).listen(httpPort);

    console.log(`serving folder '${absFolder}' on port: ${httpPort}`);
}

startServer();
eventServer.start();
