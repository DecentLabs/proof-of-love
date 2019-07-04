const ProofOfLove = artifacts.require("./ProofOfLove.sol");
const RelayHubAddress = "";

module.exports = function(deployer) {
    deployer.then(async () => {
        await deployer.deploy(ProofOfLove, RelayHubAddress);
    });
};