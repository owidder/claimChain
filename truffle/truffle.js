var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "season divert corn exchange harbor book boat allow vivid error apple process";

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        local: {
            host: "127.0.0.1",
            port: 8501,
            network_id: 27408
        },
        local2: {
            host: "127.0.0.1",
            port: 8502,
            network_id: 46953
        },
        rinkeby : {
            host: "127.0.0.1",
            port: 8545,
            network_id: 4,
            from: "0x8202da978bf626e1abdb4cd90d6528551537c760"
        },
        eth01 : {
            host: "127.0.0.1",
            port: 6545,
            network_id: 4,
            from: "0x8202da978bf626e1abdb4cd90d6528551537c760"
        },
        infura : {
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/6b901e50131a4b69a46c6aad0294cb1d")
            },
            network_id: 4,
        },
        eth01_2 : {
            host: "127.0.0.1",
            port: 6545,
            network_id: 4,
            from: "0x311c5f508d65d8d64045acdc3c0f92d2972ee2cc"
        },
    }
};
