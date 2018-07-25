const express = require('express');
const http = require('http');

const eventServer = require('./eventServer');
const claimFinder = require('./claimFinder');
const contracts = require('../contracts/contracts');

const contractAddress = contracts.getDefaultAddress(contracts.ClaimChain);

const EMPTY = {
    hash: undefined,
    account: undefined,
    blockNo: undefined,
    blockTime: undefined,
    contractAddress
}

const createRestApi = (app) => {

    const api = express.Router();

    api.get("/check/:hash", (req, res) => {
        const _c = contractAddress;
        const hash = req.params.hash;
        const claims = claimFinder.getClaims(hash) || [{hash, contractAddress}];
        res.json(claims);
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
