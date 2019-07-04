pragma solidity 0.4.24;

import "tabookey-gasless/contracts/RelayRecipient.sol";

contract ProofOfLove is RelayRecipient {
    
    uint32 public count = 0;

    event Love(string name1, string name2);

    constructor(address hubAddress) public {
        init_relay_hub(RelayHub(hubAddress));
    }

    function prove(string name1, string name2) external {
        count += 1;
        emit Love(name1, name2);
    }

    function accept_relayed_call(address relay, address from, bytes memory encoded_function, uint gas_price, uint transaction_fee)
    public view returns(uint32) {
        return 0;
    }

    function post_relayed_call(address relay, address from, bytes memory encoded_function, bool success, uint used_gas, uint transaction_fee)
    public {
    }
}
