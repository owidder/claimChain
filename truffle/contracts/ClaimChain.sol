pragma solidity ^0.4.19;

contract ClaimChain {
    
    mapping (string => address) hashToAddress;
    mapping (string => int) hashToBlockNumber;

    function registerHash(string id) public {
        hashToAddress[id] = msg.sender;
        hashToBlockNumber[id] = int(block.number);
    }
}
