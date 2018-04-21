import {connect} from '../webSocket/webSocketHub';

const events = [];
const listeners = [];

const sendAllEventsToListener = (listener) => {
    events.forEach((event) => {
        listener(event);
    })
}

export const addListener = (listener) => {
    sendAllEventsToListener(listener);
    listeners.push(listener);
}

export const sendEventToAllListeners = (event) => {
    listeners.forEach((listener) => {
        listener(event);
    })
}

connect(1337, (event) => {
    events.push(event);
    sendEventToAllListeners(event);
});
