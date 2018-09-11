import * as _ from 'lodash';
const Web3 = require('web3');
const ClaimChain = require('./_ClaimChain.json');

let web3js;

if(!_.isUndefined(window.web3)) {
    web3js = new Web3(window.web3.currentProvider);
}

//const claimChainContract = web3js.eth.contract(ClaimChain.abi).at(ClaimChain.address);
const claimChainContract = new web3js.eth.Contract(ClaimChain.abi, ClaimChain.address);

export const canStartTransaction = () => {
    return (!_.isUndefined(web3js));
}

export const contractAddress = ClaimChain.address;

export const startRegisterHashTransaction = (hash) => {
    claimChainContract.registerHash(hash).call({from: web3js.eth.coinbase}, (error, result) => {
        if(!error) {
            console.log(result);
        }
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

