let _web3;

function setWeb3(web3) {
    _web3 = web3;
}

function getWeb3() {
    return _web3;
}

module.exports = {
    setWeb3, getWeb3
};
