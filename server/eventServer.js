const WebSocketServer = require('./WebSocketServer');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');

const webSocketServer = new WebSocketServer();

eventsUtil.subscribe(contracts.ChainTraze, "Position").on('event', (data) => {
    console.log(data);
    webSocketServer.sendObjectToAllSockets(data);
});

eventsUtil.subscribe(contracts.ChainTraze, "Error").on('event', (data) => {
    console.log(data);
    webSocketServer.sendObjectToAllSockets(data);
});

eventsUtil.subscribe(contracts.ChainTraze, "Reward").on('event', (data) => {
    console.log(data);
    webSocketServer.sendObjectToAllSockets(data);
});

webSocketServer.connect(1337);
