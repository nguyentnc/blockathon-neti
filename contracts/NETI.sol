// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "./libraries/VRC25.sol";

contract NETI is VRC25 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 supply
    ) VRC25(name, symbol, decimals_) {
        _mint(msg.sender, supply);
    }

    function _estimateFee(
        uint256 value
    ) internal view override returns (uint256) {
        if (value > minFee()) {
            return value;
        }
        return minFee();
    }
}
