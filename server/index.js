const accountsUtil = require('./web3/accountsUtil');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});

eventsUtil.subscribe(contracts.ClaimChain, "Position").on('event', (data) => {
    console.log(data);
});

eventsUtil.subscribe(contracts.ClaimChain, "Error").on('event', (data) => {
    console.log(data);
});

eventsUtil.subscribe(contracts.ClaimChain, "Reward").on('event', (data) => {
    console.log(data);
});
