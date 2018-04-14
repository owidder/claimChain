const _ = require('lodash');
const ethers = require('ethers');
const web3Util = require('./web3Util');

let _provider;

const getProvider = () => {
    if(_.isUndefined(_provider)) {
        const web3 = web3Util.getWeb3();
        _provider = new ethers.providers.Web3Provider(web3);
    }

    return _provider;
}

module.exports = {
    getProvider
}