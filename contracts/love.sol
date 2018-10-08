pragma solidity 0.4.24;


contract ProofOfLove {

    event Love(string name1, string name2);

    constructor() public {
        // do nothing
    }

    function prove(string name1, string name2) external {
        emit Love(name1, name2);
    }
}