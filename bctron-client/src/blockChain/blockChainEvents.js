import * as _ from 'lodash';
import {connect} from '../webSocket/webSocketHub';
import {guid} from '../util/random';
import {setAddress} from './info';

const allEvents = [];
const listenersForAllEvents = [];

const claimEventsArray = [];
const listenersForClaimEvents = [];

const nameEventsArray = [];
const listenersForNameEvents = [];

const heads = {};
const listenersForHeads = [];

const listenersForNewBlockNumber = [];

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

export const addListenerForClaimEvents = (listener) => {
    sendManyThingsToOneListener(claimEventsArray, listener);
    listenersForClaimEvents.push(listener);
}

export const addListenerForNameEvents = (listener) => {
    sendManyThingsToOneListener(nameEventsArray, listener);
    listenersForNameEvents.push(listener);
}

const newEvent = (event) => {
    switch (event.event) {
        case "NewClaim":
            claimEventsArray.push(event);
            break;

        case "NewName":
            nameEventsArray.push(event);
            break;
    }

    sendOneThingToManyListeners(event);
}

connect(1337, (event) => {
    newEvent(event);
});
