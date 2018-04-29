const WebSocketServer = require('./WebSocketServer');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');
const eventUtil = require('./util/eventUtil');

const webSocketServer = new WebSocketServer();

const eventsToListenTo = contracts.getEventNames(contracts.ChainTraze);

const newEvent = (event) => {
    eventUtil.saveEvent(event);
    webSocketServer.sendObjectToAllSockets(event);
}

eventsToListenTo.forEach((eventName) => {
    eventsUtil.pastEvents(contracts.ChainTraze, eventName).on('event', (events) => {
        events.forEach((event) => {
            newEvent(event);
        })
    });

    eventsUtil.subscribe(contracts.ChainTraze, eventName).on('event', (event) => {
        newEvent(event);
    });
})

webSocketServer.onConnectCallback = (socketId) => {
    eventUtil.getAllEvents().forEach((event) => {
        webSocketServer.sendObject(socketId, event);
    })
}

webSocketServer.connect(1337);
