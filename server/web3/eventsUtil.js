const ethers = require('ethers');
const EventEmitter = require('events');
const ethersUtil = require('./ethersUtil');
const web3Util = require('./web3Util');
const contracts = require('../contracts/contracts');

class ContractEventEmitter extends EventEmitter {}

const subscribe = (truffleContract, eventName) => {
    if(web3Util.web3version.startsWith("1")) {
        return subscribeViaWebsockets(truffleContract, eventName);
    }
    else {
        return subscribeWithEthers(truffleContract, eventName);
    }
}

const subscribeWithEthers = (truffleContract, eventName) => {
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
    const contractEventEmitter = new ContractEventEmitter();
    const web3 = web3Util.getWeb3WithWsProvider();
    const contract = new web3.eth.Contract(truffleContract.abi, contracts.getDefaultAddress(truffleContract));
    const options = {fromBlock: 0, toBlock: "latest"};
    contract.events[eventName]({}, (error, data) => {
        if(!error) {
            contractEventEmitter.emit('event', data);
        }
        else {
            console.error(error);
        }
    });

    return contractEventEmitter;
}

module.exports = {
    subscribe
}