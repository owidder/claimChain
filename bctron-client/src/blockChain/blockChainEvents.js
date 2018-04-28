import * as _ from 'lodash';
import {connect} from '../webSocket/webSocketHub';

const allEvents = [];
const listenersForAllEvents = [];

const positionsArray = [];
const listenersForPositions = [];

const headPositions = {};
const listenersForHeadPositions = [];

/**
 *
 * @param manyThings array, send piece by piece to the oneListener
 * @param oneListener
 */
const sendManyThingsToOneListener = (manyThings, oneListener) => {
    manyThings.forEach((event) => {
        oneListener(event);
    })
}

/**
 *
 * @param oneThing could be anything, even an array, but send as one thing to all of the manyListeners
 * @param manyListeners array of listeners
 */
const sendOneThingToManyListeners = (oneThing, manyListeners) => {
    manyListeners.forEach((listener) => {
        listener(oneThing);
    })
}

export const addListenerForAllEvents = (listener) => {
    sendManyThingsToOneListener(allEvents, listener);
    listenersForAllEvents.push(listener);
}

export const addListenerForPositions = (listener) => {
    sendManyThingsToOneListener(positionsArray, listener);
    listenersForPositions.push(listener);
}

export const addListenerForHeadPositions = (listener) => {
    listener(headPositions);
    listenersForHeadPositions.push(listener);
}

const newPositionEvent = (positionEvent) => {
    const position = positionEvent.returnValues;
    const id = position.id;

    positionsArray.push(position);
    sendOneThingToManyListeners(position, listenersForPositions);

    headPositions[id] = position;
    sendOneThingToManyListeners(headPositions, listenersForHeadPositions);
}

const newEvent = (event) => {
    allEvents.push(event);
    sendOneThingToManyListeners(event, listenersForAllEvents);

    switch (event.event) {
        case "Position":
            newPositionEvent(event);
            break;
    }
}

connect(1337, (event) => {
    newEvent(event);
});
