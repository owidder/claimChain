let _web3;
let _contractInfo = {};

function setWeb3(web3) {
    _web3 = web3;
}

function getWeb3() {
    return _web3;
}

function setContractInfo(contractName, info) {
    _contractInfo[contractName] = info;
}

function getContractInfo(contractName) {
    return _contractInfo[contractName];
}

module.exports = {
    setWeb3, getWeb3,
    setContractInfo, getContractInfo
};
