pragma solidity ^0.4.19;

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
    mapping (string => uint) lastBlockNumbers;
    mapping (string => uint) totalRewards;
    
    event Position(string id, uint x, uint y, uint reward);
    event Position2(string id, string x, string y, uint reward);
    event Error(string message);
    event Reward(string id, uint reward, uint totalReward);
    
    function computeIndex(uint x, uint y) pure internal returns(uint index) {
        index = y * X_DIM + x;
    }

    function computeReward(string id) internal {
        uint lastBlockNumber = lastBlockNumbers[id];
        uint currentBlockNumber = block.number;
        uint reward = lastBlockNumber > 0 ? currentBlockNumber - lastBlockNumber : 0;
        lastBlockNumbers[id] = currentBlockNumber;
        totalRewards[id] += reward;
        Reward(id, reward, totalRewards[id]);
    }
    
    function getPositionContent(uint x, uint y) public view returns(string) {
        uint index = computeIndex(x, y);
        return field[index];
    }
    
    function checkId(string id) internal returns(bool) {
        address existingAddress = idToAddress[id];
        if(existingAddress != address(0x0)) {
            Error("id already exists");
            return false;
        }
        
        return true;
    }
    
    function checkPosition(uint x, uint y) internal returns(bool) {
        uint index = computeIndex(x, y);
        string storage content = field[index];
        uint len = bytes(content).length;
        if(len > 0) {
            Error("position not free");
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
            Position(id, x, y);
            string memory sx = uintToString(x);
            string memory sy = uintToString(y);
            Position2(id, sx, sy);
    }

    function isAllowed(string id) internal returns(bool) {
        address addressForId = idToAddress[id];
        if(addressForId == address(0x0)) {
            Error("id does not exist");
            return false;
        }
        if(msg.sender != addressForId) {
            Error("id belongs to: " + idToAddress);
            return false;
        }

        return true;
    }

    function move(string id, int dx, int dy) internal {
        if(isAllowed(id)) {
            uint currentx = xpositions[id];
            uint currenty = ypositions[id];
            uint _nx = currentx + dx;
            uint _ny = currenty + dy;
            uint nextx = nx < 0 ? X_DIM - 1 : (nx >= X_DIM ? 0 : nx);
            uint nexty = ny < 0 ? Y_DIM - 1 : (ny >= Y_DIM ? 0 : ny);
            if(checkPosition(nextx, nexty)) {
                goIntoField(id, nextx, nexty);
                computeReward(id);
            }
        }
    }
    
    function registerId(string id) internal {
        addressToId[msg.sender] = id;
        idToAddress[id] = msg.sender;
    }

    function north(string id) public {
        move(id, 0, -1);
    }

    function south(string id) public {
        move(id, 0, 1);
    }

    function west(string id) public {
        move(id, -1, 0);
    }

    function east(string id) public {
        move(id, 1, 0);
    }
    
    function register(string id, uint startx, uint starty) public {
        if(checkId(id) && checkPosition(startx, starty)) {
            registerId(id);
            goIntoField(id, startx, starty);
        }
    }
}
