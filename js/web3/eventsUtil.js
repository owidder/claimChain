const ethers = require('ethers');
const EventEmitter = require('events');
const ethersUtil = require('./ethersUtil');

class ContractEventEmitter extends EventEmitter {}

const subscribe = (contractInfo, eventName) => {
    const provider = ethersUtil.getProvider();
    const _interface = new ethers.Interface(contractInfo.abi);

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