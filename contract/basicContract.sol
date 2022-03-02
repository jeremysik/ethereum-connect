// Contract based on [https://docs.openzeppelin.com/contracts/4.x/erc20](https://docs.openzeppelin.com/contracts/4.x/erc20)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthereumConnectToken is ERC20 {
    constructor() ERC20("Ethereum Connect Token", "ECT") {
    }

    function mint() public {
        _mint(msg.sender, 10 * 10**18);
    }
}