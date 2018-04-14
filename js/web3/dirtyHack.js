function dirtyHack(provider) {
    //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    if (typeof provider.sendAsync !== "function") {
        provider.sendAsync = function() {
            return provider.send.apply(provider, arguments);
        };
    }
}

module.exports = dirtyHack;
