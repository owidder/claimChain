const global = require('./global');
const web3 = require('./web3/connect');
const accountsUtil = require('./web3/accountsUtil');

global.setWeb3(web3);

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});
