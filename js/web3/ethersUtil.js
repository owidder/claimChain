const _ = require('lodash');
const ethers = require('ethers');
const web3Util = require('./web3Util');

let _provider;

const getProvider = () => {
    if(_.isUndefined(_provider)) {
        const web3Provider = web3Util.getWeb3Provider();
        _provider = new ethers.providers.Web3Provider(web3Provider);
    }

    return _provider;
}

module.exports = {
    getProvider
}