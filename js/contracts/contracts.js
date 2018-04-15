const truffleContract = require('truffle-contract');
const web3Util = require('../web3/web3Util');
const chainTrazeArtifacts = require('../../truffle/build/contracts/ChainTraze.json');
const ChainTraze = truffleContract(chainTrazeArtifacts);

const currentProvider = web3Util.getWeb3().currentProvider;

ChainTraze.setProvider(currentProvider);

const sayHello = async (truffleContract) => {
    const contractInstance = await truffleContract.deployed();
    console.log(truffleContract.contractName + " [" + contractInstance.address + "]");
}

sayHello(ChainTraze);

module.exports = {
    ChainTraze
}
