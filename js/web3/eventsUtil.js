const ethers = require('ethers');
const web3 = require('./connect');
const global = require('../global');
const EventEmitter = require('events');

class ContractEventEmitter extends EventEmitter {}

const provider = new ethers.providers.Web3Provider(web3);

const subscribe = (contractName, eventName) => {
    const _abi = global.getContractInfo(contractName);
    const _interface = new ethers.Interface(_abi);

    const contractEventEmitter = new ContractEventEmitter();

    provider.on(_interface.events[eventName].topics, function (log) {
        const data = _interface.events[eventName].parse(log.data);
        contractEventEmitter.emit(data);
    });

    return contractEventEmitter;
}

module.exports = {
    subscribe
}