var ClaimChain = artifacts.require("./ClaimChain.sol");

module.exports = function(deployer) {
  deployer.deploy(ClaimChain);
};
