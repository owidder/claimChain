const _ = require('lodash');
const web3version = require('web3/package.json').version;
const Web3 = require('web3');

let _web3;
let _web3WithWsProvider;
let _web3Provider;
let _web3WebSocketProvider;

const HOST = "127.0.0.1";
const HTTP_PORT = "7545";
const WS_PORT = "7545";

const HTTP_URL = "http://" + HOST + ":" + HTTP_PORT;
const WS_URL = "ws://" + HOST + ":" + WS_PORT;

console.log(HTTP_URL);
console.log(WS_URL);

const getWeb3 = () => {
    if(_.isUndefined(_web3)) {
        _web3 = new Web3(getWeb3Provider());
    }

    return _web3;
}

const getWeb3WithWsProvider = () => {
    if(_.isUndefined(_web3WithWsProvider)) {
        _web3WithWsProvider = new Web3(getWeb3WebSocketProvider());
    }

    return _web3WithWsProvider;
}

const getWeb3Provider = () => {
    if(_.isUndefined(_web3Provider)) {
        _web3WebSocketProvider = new Web3.providers.HttpProvider(HTTP_URL);
    }

    return _web3WebSocketProvider;
}

const getWeb3WebSocketProvider = () => {
    if(_.isUndefined(_web3Provider)) {
        _web3Provider = new Web3.providers.WebsocketProvider(WS_URL);
    }

    return _web3Provider;
}

module.exports = {
    web3version, getWeb3, getWeb3Provider, getWeb3WebSocketProvider, getWeb3WithWsProvider
}
