const web3util = require('./web3Util');
const ethersUtil = require('./ethersUtil');

const getAccountsWithWeb3 = () => {
    return web3util.getWeb3().eth.getAccounts();
}

const getAccountsWithEthers = () => {
    const provider = ethersUtil.getProvider();
    return provider.listAccounts();
}

const getAccounts = () => {
    if(web3util.web3version.startsWith("1")) {
        return getAccountsWithWeb3();
    }
    else {
        return getAccountsWithEthers();
    }
}

const getDefaultAccount = () => {
    return new Promise((resolve, reject) => {
        getAccounts().then((accounts) => {
            if(accounts && accounts.length > 0) {
                resolve(accounts[0]);
            }
            else {
                reject("no account found");
            }
        })
    })
};

module.exports = {
    getDefaultAccount, getAccounts
};
