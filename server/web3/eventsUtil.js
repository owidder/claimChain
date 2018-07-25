const ethers = require('ethers');
const EventEmitter = require('events');
const ethersUtil = require('./ethersUtil');
const web3Util = require('./web3Util');
const contracts = require('../../contracts/contracts');

class ContractEventEmitter extends EventEmitter {}
class ChainEventEmitter extends EventEmitter {}

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

    provider.on(_interface.positions[eventName].topics, function (log) {
        const data = _interface.positions[eventName].parse(log.data);
        contractEventEmitter.emit('event', data);
    });

    return contractEventEmitter;
}

const subscribeNewBlocks = () => {
    const chainEventEmitter = new ChainEventEmitter();
    const web3 = web3Util.getWeb3WithWsProvider();
    web3.eth.subscribe('newBlockHeaders', (error, result) => {
        console.log(result);
    })
        .on("data", (blockHeader) => {
        consoloe.log(blockHeader);
    })
}

const _subscribeNewBlockNumberRecursive = (web3, eventEmitter, lastBlockNumber) => {
    web3.eth.getBlockNumber().then((blockNumber) => {
        if(lastBlockNumber !== blockNumber) {
            eventEmitter.emit('newBlockNumber', {
                type: "blockNumber", blockNumber
            })
        }
        setTimeout(() => {
            _subscribeNewBlockNumberRecursive(web3, eventEmitter, blockNumber);
        }, 2000);
    })
}

const subscribeNewBlockNumber = (lastBlockNumber) => {
    const chainEventEmitter = new ChainEventEmitter();
    const web3 = web3Util.getWeb3WithWsProvider();
    _subscribeNewBlockNumberRecursive(web3, chainEventEmitter, 0);

    return chainEventEmitter;
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

const pastEvents = (truffleContract, eventName) => {
    const contractEventEmitter = new ContractEventEmitter();
    const web3 = web3Util.getWeb3();
    const contract = new web3.eth.Contract(truffleContract.abi, contracts.getDefaultAddress(truffleContract));
    const options = {fromBlock: 0, toBlock: "latest"};
    contract.getPastEvents(eventName, options, (error, data) => {
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
    subscribe, pastEvents, subscribeNewBlocks, subscribeNewBlockNumber
}