import * as _ from 'lodash';

import {addListenerForClaimEvents} from './blockChain/blockChainEvents';

const claimEvents = [];

const transformEvent = (event) => {
    return {
        hash: event.returnValues[0],
        account: event.returnValues[1],
        blockNo: event.returnValues[2],
        blockTime: event.returnValues[3],
    }
}

export const init = () => {
    addListenerForClaimEvents((claimEvent) => {
        claimEvents.push(transformEvent(claimEvent))
    });
}

export const check = (hash) => {
    const match = claimEvents.filter((event) => {
        return event.hash == hash;
    })

    if(!_.isEmpty(match)) {
        return match[0];
    }
}
