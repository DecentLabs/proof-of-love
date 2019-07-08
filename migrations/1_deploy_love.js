const ProofOfLove = artifacts.require("./ProofOfLove.sol");
const RelayHubAddress = "0x1349584869A1C7b8dc8AE0e93D8c15F5BB3B4B87"; // ropsten gas relay hub

module.exports = function(deployer) {
    deployer.then(async () => {
        await deployer.deploy(ProofOfLove, RelayHubAddress);
    });
};