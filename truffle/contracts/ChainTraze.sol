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
    
    event Position(string id, uint x, uint y);
    event Position2(string id, string x, string y);
    event Error(string message);
    event Reward(string id, uint reward, uint totalReward);
    
    function computeIndex(uint x, uint y) pure internal returns(uint index) {
        index = y * X_DIM + x;
    }

    function computeReward(string id) internal {
        uint lastBlockNumber = lastBlockNumbers[id];
        uint currentBlockNumber = block.number;
        uint diff = currentBlockNumber - lastBlockNumber;
        uint reward = lastBlockNumber > 0 ? (diff > 1 ? diff : 0) : 0;
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
    
    function addressToString(address x) internal pure returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
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
            Error("id does not belong to sender");
            return false;
        }

        return true;
    }

    function move(string id, int dx, int dy) internal {
        if(isAllowed(id)) {
            uint currentx = xpositions[id];
            uint currenty = ypositions[id];
            int _nx = int(currentx) + dx;
            int _ny = int(currenty) + dy;
            int nextx = _nx < 0 ? int(X_DIM) - 1 : (_nx >= int(X_DIM) ? 0 : _nx);
            int nexty = _ny < 0 ? int(Y_DIM) - 1 : (_ny >= int(Y_DIM) ? 0 : _ny);
            if(checkPosition(uint(nextx), uint(nexty))) {
                goIntoField(id, uint(nextx), uint(nexty));
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

    function northwest(string id) public {
        move(id, -1, -1);
    }

    function west(string id) public {
        move(id, -1, 0);
    }

    function southwest(string id) public {
        move(id, -1, 1);
    }

    function south(string id) public {
        move(id, 0, 1);
    }

    function southeast(string id) public {
        move(id, 1, 1);
    }

    function east(string id) public {
        move(id, 1, 0);
    }

    function northeast(string id) public {
        move(id, 1, -1);
    }
    
    function register(string id, uint startx, uint starty) public {
        if(checkId(id) && checkPosition(startx, starty)) {
            registerId(id);
            goIntoField(id, startx, starty);
        }
    }
}
