import * as _ from 'lodash';
import {ClaimChain} from './ClaimChain.truffle';

const Web3 = require('web3');

let web3js;

if(!_.isUndefined(window.web3)) {
    web3js = new Web3(window.web3.currentProvider);
}

const claimChainContract = new web3js.eth.Contract(ClaimChain.abi, ClaimChain.address);

export const canStartTransaction = () => {
    return (!_.isUndefined(web3js));
}

export const contractAddress = ClaimChain.address;

export const startRegisterHashTransaction = (hash) => {
    return new Promise(async resolve => {
        const coinbase = await web3js.eth.getCoinbase();
        const receipt = await claimChainContract.methods.registerHash(hash).send({from: coinbase});

        resolve(receipt);
    })
}

export const pastEvents = () => {
    return new Promise(async resolve => {
        const events = await claimChainContract.getPastEvents("NewClaim", {fromBlock: 0, toBlock: "latest"});

        resolve(events);
    })
}

export const numberOfClaimsForHash = (hash) => {
    return new Promise(async resolve => {
        const coinbase = await web3js.eth.getCoinbase();
        const numberOfClaims = await claimChainContract.methods.numberOfClaimsForHash(hash).call({from: coinbase});

        resolve(numberOfClaims);
    })
}

export const claimerAddressFromHashAndIndex = (hash, index) => {
    return new Promise(async resolve => {
        const coinbase = await web3js.eth.getCoinbase();
        const address = await claimChainContract.methods.claimerAddressFromHashAndIndex(hash, index).call({from: coinbase});

        resolve(address);
    })
}

export const blockNumberFromHashAndIndex = (hash, index) => {
    return new Promise(async resolve => {
        const coinbase = await web3js.eth.getCoinbase();
        const blockNumber = await claimChainContract.methods.blockNumberFromHashAndIndex(hash, index).call({from: coinbase});

        resolve(blockNumber);
    })
}

export const blockTimestampFromHashAndIndex = (hash, index) => {
    return new Promise(async resolve => {
        const coinbase = await web3js.eth.getCoinbase();
        const blockTimestamp = await claimChainContract.methods.blockTimestampFromHashAndIndex(hash, index).call({from: coinbase});

        resolve(blockTimestamp);
    })
}

