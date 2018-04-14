const global = require('./global');
const accountsUtil = require('./web3/accountsUtil');
const eventsUtil = require('./web3/eventsUtil');

const chainTrazeContractInfo = require('./contracts/chainTrazeContractInfo');
global.setContractInfo(chainTrazeContractInfo.NAME, chainTrazeContractInfo);

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});

eventsUtil.subscribe(chainTrazeContractInfo.NAME, chainTrazeContractInfo.events.POSITION2).on('event', (data) => {
    console.log(data);
});
