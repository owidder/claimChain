pragma solidity ^0.4.19;

contract ClaimChain {

    struct Claim {
        address claimer;
        uint blockNumber;
        uint blockTimestamp;
    }
    
    event NewClaim(string, address, uint, uint);
    event NewName(address, string);

    mapping (string => Claim[]) hashToClaim;
    mapping (address => string) addressToName;

    function registerHash(string hash) public {
        Claim memory claim = Claim(msg.sender, block.number, block.timestamp);
        hashToClaim[hash].push(claim);
        emit NewClaim(hash, msg.sender, block.number, block.timestamp);
    }

    function registerName(string name) public {
        addressToName[msg.sender] = name;
        emit NewName(msg.sender, name);
    }

    function getName(address addr) public view returns(string) {
        return addressToName[addr];
    }

    function numberOfClaimsForHash(string hash) public view returns(uint) {
        return hashToClaim[hash].length;
    }

    function claimerAddressFromHashAndIndex(string hash, uint index) public view returns(address) {
        Claim storage claim =  hashToClaim[hash][index];
        return claim.claimer;
    }

    function blockNumberFromHashAndIndex(string hash, uint index) public view returns(uint) {
        Claim storage claim =  hashToClaim[hash][index];
        return claim.blockNumber;
    }

    function blockTimestampFromHashAndIndex(string hash, uint index) public view returns(uint) {
        Claim storage claim =  hashToClaim[hash][index];
        return claim.blockTimestamp;
    }
}
