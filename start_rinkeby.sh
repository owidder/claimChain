#!/usr/bin/env bash
geth --rinkeby --rpc --rpcaddr 'localhost' --rpccorsdomain "http://localhost:8080" --rpcport 8545 --rpcapi 'personal,db,eth,net,web3,txpool,miner,debug,admin' --ws --wsapi "db,eth,net,web3,personal" --wsport 8163 --wsaddr 'localhost' --wsorigins "*"
