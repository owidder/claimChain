const WebSocketServer = require('./WebSocketServer');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');
const eventUtil = require('./util/eventUtil');

const webSocketServer = new WebSocketServer();

const eventsToListenTo = contracts.getEventNames(contracts.ChainTraze);

eventsToListenTo.forEach((eventName) => {
    eventsUtil.subscribe(contracts.ChainTraze, eventName).on('event', (event) => {
        eventUtil.saveEvent(event);
        webSocketServer.sendObjectToAllSockets(event);
    });
})

webSocketServer.onConnectCallback = (socketId) => {
    eventUtil.getAllEvents().forEach((event) => {
        webSocketServer.sendObject(socketId, event);
    })
}

webSocketServer.connect(1337);
