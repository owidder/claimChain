pragma solidity ^0.4.19;

contract ChainTraze {
    
    int constant X_DIM = 100;
    int constant Y_DIM = 100;
    int constant FIELD_SIZE = X_DIM*Y_DIM;
    int constant PENALTY = -2;
    int constant BUMP = 10;
    
    mapping (address => int256) balances;
    
    string[FIELD_SIZE] field;

    mapping (address => string) addressToId;
    mapping (string => address) idToAddress;
    mapping (string => int) xpositions;
    mapping (string => int) ypositions;
    mapping (string => int) lastBlockNumbers;
    mapping (string => int) totalRewards;

    // The following 4 functions are a workaround to get around an unsolvded Ganache Bug:
    // https://github.com/trufflesuite/ganache-cli/issues/458
    // When setting an position from any value > 0 to zero an error occurs

    function setXposition(string id, int pos) internal {
        xpositions[id] = pos + 1;
    }

    function getXPosition(string id) view internal returns(int) {
        return xpositions[id] - 1;
    }
    
    function setYposition(string id, int pos) internal {
        ypositions[id] = pos + 1;
    }
    
    function getYPosition(string id) view internal returns(int) {
        return ypositions[id] - 1;
    }
    
    event Position(string id, int x, int y, int reward, int totalReward);
    event Error(string message);
    event IdAlreadyExistsError(string id);
    event IdDoesNotExistError(string id);
    event IdDoesNotBelongToSender(string id);
    event PositionIsNotFreeError(string id, int x, int y, int reward, int totalReward);
    event PositionIsOutsideOfFieldError(string id, int x, int y, int reward, int totalReward);
    
    function computeIndex(int x, int y) pure internal returns(uint index) {
        index = uint(y * X_DIM + x);
    }

    function addReward(string id, int reward) internal returns(int _totalReward) {
        if(totalRewards[id] != 0 && totalRewards[id] == (reward * -1)) {
            if(totalRewards[id] > 0) {
                totalRewards[id] = -BUMP;
            }
            else {
                totalRewards[id] = BUMP;
            }
        }
        else {
            totalRewards[id] += reward;
        }
        return totalRewards[id];
    }

    function computeReward(string id) internal returns(int _reward, int _totalReward){
        int lastBlockNumber = lastBlockNumbers[id];
        int currentBlockNumber = int(block.number);
        int diff = currentBlockNumber - lastBlockNumber;
        int reward = lastBlockNumber > 0 ? (diff > 1 ? diff : 0) : 0;
        lastBlockNumbers[id] = currentBlockNumber;
        int totalReward = addReward(id, reward);
        return (reward, totalReward);
    }
    
    function getPositionContent(int x, int y) public view returns(string) {
        uint index = computeIndex(x, y);
        return field[index];
    }
    
    function checkId(string id) internal returns(bool) {
        address existingAddress = idToAddress[id];
        if(existingAddress != address(0x0)) {
            emit IdAlreadyExistsError(id);
            return false;
        }
        
        return true;
    }

    function isInsideField(string id, int x, int y) internal returns(bool) {
        if(x < 0 || x >= X_DIM || y < 0 || y >= Y_DIM) {
            int totalReward = addReward(id, PENALTY);
            emit PositionIsOutsideOfFieldError(id, x, y, PENALTY, totalReward);
            return false;
        }

        return true;
    }

    function isFree(string id, int x, int y) internal returns(bool) {
        uint index = computeIndex(x, y);
        string storage content = field[index];
        uint len = bytes(content).length;
        if(len > 0) {
            int totalReward = addReward(id, PENALTY);
            emit PositionIsNotFreeError(id, x, y, PENALTY, totalReward);
            return false;
        }
        
        return true;
    }
    
    function checkPosition(string id, int x, int y) internal returns(bool) {
        return isInsideField(id, x, y) && isFree(id, x, y);
    }
    
    function goIntoField(string id, int x, int y) internal {
        uint index = computeIndex(x, y);
        field[index] = id;
        setXposition(id, x);
        setYposition(id, y);
        int reward;
        int totalReward;
        (reward, totalReward) = computeReward(id);
        emit Position(id, x, y, reward, totalReward);
    }

    function move(int dx, int dy) internal {
        string storage id = addressToId[msg.sender];
        int currentx = getXPosition(id);
        int currenty = getYPosition(id);
        int nextx = currentx + dx;
        int nexty = currenty + dy;

        if(checkPosition(id, nextx, nexty)) {
            goIntoField(id, nextx, nexty);
        }
    }
    
    function registerId(string id) internal {
        addressToId[msg.sender] = id;
    }

    function north() public {
        move(0, -1);
    }

    function northwest() public {
        move(-1, -1);
    }

    function west() public {
        move(-1, 0);
    }

    function southwest() public {
        move(-1, 1);
    }

    function south() public {
        move(0, 1);
    }

    function southeast() public {
        move(1, 1);
    }

    function east() public {
        move(1, 0);
    }

    function northeast() public {
        move(1, -1);
    }
    
    function register(string id, int startx, int starty) public {
        if(checkId(id) && checkPosition(id, startx, starty)) {
            registerId(id);
            goIntoField(id, startx, starty);
        }
    }
}
