const ethers = require('ethers');

const Web3 = require('web3');
const web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');

const web3 = require('./connect');
const global = require('../global');
const EventEmitter = require('events');

class ContractEventEmitter extends EventEmitter {}

const provider = new ethers.providers.Web3Provider(web3Provider);

const subscribe = (contractName, eventName) => {
    const _abi = global.getContractInfo(contractName).abi;
    const _interface = new ethers.Interface(_abi);

    const contractEventEmitter = new ContractEventEmitter();

    provider.on(_interface.events[eventName].topics, function (log) {
        const data = _interface.events[eventName].parse(log.data);
        contractEventEmitter.emit('event', data);
    });

    return contractEventEmitter;
}

module.exports = {
    subscribe
}