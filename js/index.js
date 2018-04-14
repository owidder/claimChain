const global = require('./global');
const web3 = require('./web3/connect');
const accountsUtil = require('./web3/accountsUtil');
const contracts = require('./contracts');
const eventsUtil = require('./web3/eventsUtil');

const chainTrazeContractInfo = require('./contracts/chainTrazeContractInfo');
global.setContractInfo(contracts.CHAIN_TRAZE, chainTrazeContractInfo);

global.setWeb3(web3);

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});

eventsUtil.subscribe(contracts.CHAIN_TRAZE, chainTrazeContractInfo.events.POSITION2);
