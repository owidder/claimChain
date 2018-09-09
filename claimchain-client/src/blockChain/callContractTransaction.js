import * as _ from 'lodash';
const Web3 = require('web3');
const ClaimChain = require('../_ClaimChain.json');

let web3js;

if(!_.isUndefined(window.web3)) {
    web3js = new Web3(window.web3.currentProvider);
}

const claimChainContract = web3js.eth.contract(ClaimChain.abi).at(ClaimChain.address);

export const canStartTransaction = () => {
    return (!_.isUndefined(web3js));
}

export const startRegisterHashTransaction = (hash) => {
    claimChainContract.registerHash(hash).call({from: web3js.eth.coinbase}, (error, result) => {
        if(!error) {
            console.log(result);
        }
    })
}