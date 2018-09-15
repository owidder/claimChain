import * as _ from 'lodash';
import {numberOfClaimsForHash,
    claimerAddressFromHashAndIndex,
    blockNumberFromHashAndIndex,
    contractAddress,
    blockTimestampFromHashAndIndex,
    pastEvents,
} from './blockChain/claimChainCaller';

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

export const check = async (hash) => {
    const response = await fetch("/api/check/" + hash);
    const claims = await response.json();

    return claims;
}

const _readClaimsRecursive = async (hash, claimArray, numberOfClaims, counter, resolve) => {
    if(counter >= numberOfClaims) {
        resolve(claimArray);
    }
    const account = await claimerAddressFromHashAndIndex(hash, counter);
    const blockNo = await blockNumberFromHashAndIndex(hash, counter);
    const blockTime = await blockTimestampFromHashAndIndex(hash, counter);
    claimArray.push({account, blockNo, blockTime, hash, contractAddress});

    _readClaimsRecursive(hash, claimArray, numberOfClaims, counter+1, resolve);
}

export const check2 = async (hash) => {
    const events = pastEvents();
    const numberOfClaims = await numberOfClaimsForHash(hash);
    return new Promise(resolve => {
        _readClaimsRecursive(hash, [], numberOfClaims, 0, resolve);
    })
}

export const claim = (hash) => {

}
