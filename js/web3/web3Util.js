const _ = require('lodash');
const web3version = require('web3/package.json').version;
const Web3 = require('web3');

let _web3;
let _web3Provider;
let _web3WebSocketProvider;

const getWeb3 = () => {
    if(_.isUndefined(_web3)) {
        _web3 = new Web3("http://127.0.0.1:7545");
    }

    return _web3;
}

const getWeb3Provider = () => {
    if(_.isUndefined(_web3Provider)) {
        _web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    return _web3Provider;
}

const getWeb3WebSocketProvider = () => {
    if(_.isUndefined(_web3Provider)) {
        _web3Provider = new Web3.providers.WebSocketProvier('http://localhost:8163');
    }

    return _web3Provider;
}

module.exports = {
    web3version, getWeb3, getWeb3Provider
}
