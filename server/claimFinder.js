const claims = {};

const names = {};

const registerClaim = (event) => {

    const hash = event.returnValues[0];

    const claim = {
        contractAddress: event.address,
        account: event.returnValues[1],
        blockNo: event.returnValues[2],
        blockTime: event.returnValues[3],
        hash
    }

    if(!claims[hash]) {
        claims[hash] = [claim];
    }
    else {
        claims[hash].push(claim);
    }
}

const getClaims = (hash) => {
    return claims[hash];
}

const handleEvent = (event) => {
    switch (event.event) {
        case "NewClaim":
            registerClaim(event);
            break;

        default:
            console.log("unknown event: " + event.event);
    }
}

module.exports = {
    handleEvent,
    getClaims
}