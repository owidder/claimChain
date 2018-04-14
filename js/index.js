const accountsUtil = require('./web3/accountsUtil');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});

eventsUtil.subscribe(contracts.chainTrazeInfo, "Position2").on('event', (data) => {
    console.log(data);
});

eventsUtil.subscribe(contracts.chainTrazeInfo, "Error").on('event', (data) => {
    console.log(data);
});
