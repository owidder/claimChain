const ethers = require('ethers');
const global = require('../global');
const EventEmitter = require('events');
const ethersUtil = require('./ethersUtil');

class ContractEventEmitter extends EventEmitter {}

const subscribe = (contractName, eventName) => {
    const provider = ethersUtil.getProvider();
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