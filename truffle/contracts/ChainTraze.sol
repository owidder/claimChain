pragma solidity ^0.4.19;

import "./StringLib.sol";

contract ChainTraze {
    
    uint constant X_DIM = 1000;
    uint constant Y_DIM = 1000;
    uint constant FIELD_SIZE = X_DIM*Y_DIM;
    
    mapping (address => int256) balances;
    
    string[FIELD_SIZE] field;

    mapping (address => string) addressToId;
    mapping (string => address) idToAddress;
    mapping (string => uint) xpositions;
    mapping (string => uint) ypositions;
    
    event Position(string id, uint x, uint y);
    event Position2(string id, string x, string y);
    event Error(string message);
    
    function computeIndex(uint x, uint y) pure internal returns(uint index) {
        index = y * X_DIM + x;
    }
    
    function getPositionContent(uint x, uint y) public view returns(string) {
        uint index = computeIndex(x, y);
        return field[index];
    }
    
    function checkId(string id) internal returns(bool) {
        address existingAddress = idToAddress[id];
        if(existingAddress != address(0x0)) {
            emit Error("id already exists");
            return false;
        }
        
        return true;
    }
    
    function checkStartPosition(uint startx, uint starty) internal returns(bool) {
        uint index = computeIndex(startx, starty);
        string storage content = field[index];
        uint len = bytes(content).length;
        if(len > 0) {
            emit Error("start position not free");
            return false;
        }
        
        return true;
    }
    
    function uintToBytes(uint v) internal pure returns (bytes) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory b = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            b[j] = reversed[i - j];
        }
        
        return (b);
    }

    function uintToString(uint v) internal pure returns (string str) {
        bytes memory b = uintToBytes(v);
        str = string(b);
    }
    
    function goIntoField(string id, uint x, uint y) internal {
            uint index = computeIndex(x, y);
            field[index] = id;
            xpositions[id] = x;
            ypositions[id] = y;
            emit Position(id, x, y);
            string memory sx = uintToString(x);
            string memory sy = uintToString(y);
            emit Position2(id, sx, sy);
    }
    
    function registerId(string id) internal {
        addressToId[msg.sender] = id;
        idToAddress[id] = msg.sender;
    }
    
    function register(string id, uint startx, uint starty) public {
        if(checkId(id) && checkStartPosition(startx, starty)) {
            registerId(id);
            goIntoField(id, startx, starty);
        }
    }
}
