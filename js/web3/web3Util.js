const _ = require('lodash');
const web3version = require('web3/package.json').version;
const Web3 = require('web3');

let _web3;

const getWeb3 = () => {
    if(_.isUndefined(_web3)) {
        _web3 = new Web3("http://127.0.0.1:7545");
    }

    return _web3;
}

module.exports = {
    web3version, getWeb3
}
