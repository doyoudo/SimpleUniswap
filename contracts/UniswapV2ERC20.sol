// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UniswapV2ERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("UniswapV2Token", "UNISIMPLE") {
        _mint(msg.sender, initialSupply);
    }
}
