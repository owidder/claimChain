const _ = require('lodash');
const truffleContract = require('truffle-contract');
const web3Util = require('../web3/web3Util');
const chainTrazeArtifacts = require('../../truffle/build/contracts/ChainTraze.json');
const ChainTraze = truffleContract(chainTrazeArtifacts);

const currentProvider = web3Util.getWeb3().currentProvider;

ChainTraze.setProvider(currentProvider);

const getAddresses = (truffleContract) => {
    const addresses = [];
    _.forOwn(truffleContract.networks, (network, networkId) => {
        const address = network.address;
        addresses.push({networkId, address});
    });

    return addresses;
}

const getDefaultAddress = (truffleContract) => {
    const addresses = getAddresses(truffleContract);
    return addresses[0].address;
}

const getEventNames = (truffleContract) => {
    return _.values(truffleContract.events).map(event => event.name);
}

const sayHello = (truffleContract) => {
    console.log(truffleContract.contractName + " [" + getDefaultAddress(truffleContract) + "]");
}

sayHello(ChainTraze);
getEventNames(ChainTraze);

module.exports = {
    getAddresses, getDefaultAddress, getEventNames,
    ChainTraze
}
