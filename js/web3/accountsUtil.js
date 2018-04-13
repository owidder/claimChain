const global = require('../global');

const getDefaultAccount = () => {
    const web3 = global.getWeb3();
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts().then((accounts) => {
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
    getDefaultAccount
};
