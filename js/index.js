const global = require('./global');
const web3 = require('./web3/connect');
const accountsUtil = require('./web3/accountsUtil');
const eventsUtil = require('./web3/eventsUtil');

const chainTrazeContractInfo = require('./contracts/chainTrazeContractInfo');
global.setContractInfo(chainTrazeContractInfo.NAME, chainTrazeContractInfo);

global.setWeb3(web3);

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});

eventsUtil.subscribe3(chainTrazeContractInfo.NAME, chainTrazeContractInfo.events.POSITION2).on('event', (data) => {
    console.log(data);
});
