const ethers = require('ethers');
const EventEmitter = require('events');
const ethersUtil = require('./ethersUtil');

class ContractEventEmitter extends EventEmitter {}

const subscribe = (truffleContract, eventName) => {
    const provider = ethersUtil.getProvider();
    const _interface = new ethers.Interface(truffleContract.abi);

    const contractEventEmitter = new ContractEventEmitter();

    provider.on(_interface.events[eventName].topics, function (log) {
        const data = _interface.events[eventName].parse(log.data);
        contractEventEmitter.emit('event', data);
    });

    return contractEventEmitter;
}

const subscribeViaWebsockets = (truffleContract, eventName) => {
    const contract = new web3.eth.Contract(truffleContract.abi, truffleContract.address);
    const contractEventEmitter = new ContractEventEmitter();
    contract.events[eventName]({}, (data) => {
        contractEventEmitter.emit('event', data);
    });
}

module.exports = {
    subscribe
}