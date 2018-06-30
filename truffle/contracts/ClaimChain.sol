pragma solidity ^0.4.19;

contract ClaimChain {

    struct Claim {
        address claimer;
        uint blockNumber;
        uint blockTimestamp;
    }
    
    event NewClaim(string, Claim);
    event NewName(address, string);

    mapping (string => Claim) hashToClaim;
    mapping (address => string) addressToName;

    function registerHash(string hash) public {
        Claim memory claim = Claim(msg.sender, block.number, block.timestamp);
        hashToClaim[hash] = claim;
        emit NewClaim(hash, claim);
    }

    function registerName(string name) public {
        addressToName[msg.sender] = name;
        emit NewName(msg.sender, name);
    }

    function getName(address addr) public view returns(string) {
        return addressToName[addr];
    }

    function claimerAddressFromHash(string hash) public view returns(address) {
        Claim storage claim =  hashToClaim[hash];
        return claim.claimer;
    }

    function blockNumberFromHash(string hash) public view returns(uint) {
        Claim storage claim =  hashToClaim[hash];
        return claim.blockNumber;
    }

    function blockTimestampFromHash(string hash) public view returns(uint) {
        Claim storage claim =  hashToClaim[hash];
        return claim.blockTimestamp;
    }
}
