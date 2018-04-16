const accountsUtil = require('./web3/accountsUtil');
const eventsUtil = require('./web3/eventsUtil');
const contracts = require('./contracts/contracts');

accountsUtil.getDefaultAccount().then((account) => {
    console.log(account);
});

eventsUtil.subscribe(contracts.ChainTraze, "Position").on('event', (data) => {
    console.log(data);
});

eventsUtil.subscribe(contracts.ChainTraze, "Position2").on('event', (data) => {
    console.log(data);
});

eventsUtil.subscribe(contracts.ChainTraze, "Error").on('event', (data) => {
    console.log(data);
});

eventsUtil.subscribe(contracts.ChainTraze, "Reward").on('event', (data) => {
    console.log(data);
});
