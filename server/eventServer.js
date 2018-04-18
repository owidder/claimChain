const WebSocketServer = require('./WebSocketServer');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');
const eventUtil = require('./util/eventUtil');

const webSocketServer = new WebSocketServer();

eventsUtil.subscribe(contracts.ChainTraze, "Position").on('event', (event) => {
    eventUtil.saveEvent(event);
    webSocketServer.sendObjectToAllSockets(event);
});

eventsUtil.subscribe(contracts.ChainTraze, "Error").on('event', (event) => {
    eventUtil.saveEvent(event);
    webSocketServer.sendObjectToAllSockets(event);
});

eventsUtil.subscribe(contracts.ChainTraze, "Reward").on('event', (event) => {
    eventUtil.saveEvent(event);
    webSocketServer.sendObjectToAllSockets(event);
});

webSocketServer.onConnectCallback = (socketId) => {
    eventUtil.getAllEvents().forEach((event) => {
        webSocketServer.sendObject(socketId, event);
    })
}

webSocketServer.connect(1337);
