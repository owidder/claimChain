const ethers = require('ethers');
const web3 = require('./connect');
const global = require('../global');
const EventEmitter = require('events');
const dirtyHack = require('./dirtyHack');

class ContractEventEmitter extends EventEmitter {}

const provider = new ethers.providers.Web3Provider(web3);
dirtyHack(provider);

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

const subscribe2 = (contractName, eventName) => {
    const contractInfo = global.getContractInfo(contractName);

    const contractEventEmitter = new ContractEventEmitter();

    const options = {fromBlock: 0, toBlock: "latest", address: contractInfo.address,};
    web3.eth.subscribe("logs", options, (result) => {
        console.log(result);
        contractEventEmitter.emit('event', result);
    });

    return contractEventEmitter;
}

const subscribe3 = (contractName, eventName) => {
    const contractInfo = global.getContractInfo(contractName);

    const contractEventEmitter = new ContractEventEmitter();

    const contract = new web3.eth.Contract(contractInfo.abi, contractInfo.address);
    const options = {fromBlock: 0, toBlock: "latest"};
    contract.events[eventName](options, (result) => {
        console.log(result);
        contractEventEmitter.emit('event', result);
    });

    return contractEventEmitter;
}

module.exports = {
    subscribe, subscribe2, subscribe3
}