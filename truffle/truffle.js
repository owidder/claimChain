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
        }
    }
};
