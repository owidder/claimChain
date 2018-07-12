const express = require('express');
const http = require('http');

const eventServer = require('./eventServer');
const claimFinder = require('./claimFinder');

const EMPTY = {
    hash: undefined,
    account: undefined,
    blockNo: undefined,
    blockTime: undefined,
}

const createRestApi = (app) => {

    const api = express.Router();

    api.get("/check/:hash", (req, res) => {
        const hash = req.params.hash;
        const claim = claimFinder.getClaim(hash) || EMPTY;
        res.json(claim);
    });

    app.use("/api", api);
}

function startServer() {
    const httpPort = process.argv[3] || 1338;
    const folder = process.argv[2] || '../claimchain-client/build';

    const app = express();
    const absFolder = __dirname + '/' + folder;
    app.use('/cc', express.static(absFolder));

    http.createServer(app).listen(httpPort);
    createRestApi(app);

    console.log(`serving folder '${absFolder}' on port: ${httpPort}`);
}

startServer();
eventServer.start(claimFinder.handleEvent);
