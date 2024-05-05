// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "./libraries/VRC25.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ClaimReward is VRC25, EIP712 {
    bytes32 constant CLAIMINFO_TYPEHASH =
        keccak256("ClaimInfo(address user,uint256 amount,uint256 claimID)");
    bool public pause;
    struct ClaimInfo {
        address user;
        uint256 amount;
        uint256 claimID;
    }
    mapping(address => uint256) claimed;
    mapping(address => mapping(uint256 => bool)) public userRewarded;
    mapping(address => bool) public whitelistOperator;
    address tokenReward;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        address _token
    ) VRC25(name, symbol, decimals_) EIP712(name, "1") {
        tokenReward = _token;
        whitelistOperator[msg.sender] = true;
    }

    function setPause(bool _pause) external onlyOwner {
        pause = _pause;
    }

    function claimReward(
        ClaimInfo calldata info,
        bytes calldata _signature
    ) public {
        require(!pause, "Vault: Maintain");
        require(!userRewarded[info.user][info.claimID], "CLAIMED");
        bytes32 digest = _getHashMessage(info);
        address signer = ECDSA.recover(digest, _signature);
        require(whitelistOperator[signer], "INVALID_SIGNER");
        userRewarded[info.user][info.claimID] = true;
        IVRC25(tokenReward).transfer(info.user, info.amount);
    }

    function setWhitelistOperator(
        address[] calldata _operator,
        bool _whitelist
    ) external onlyOwner {
        require(_operator.length > 0, "Total invalid");
        for (uint256 index = 0; index < _operator.length; index++) {
            whitelistOperator[_operator[index]] = _whitelist;
        }
    }

    function emergencyWithdraw(
        uint256[] calldata _amounts,
        address[] calldata _tokens
    ) external payable onlyOwner {
        require(_amounts.length == _tokens.length, "Mismatch length");
        for (uint256 i = 0; i < _tokens.length; i++) {
            if (_tokens[i] == address(0)) {
                payable(msg.sender).transfer(address(this).balance);
            } else {
                IVRC25(_tokens[i]).transfer(msg.sender, _amounts[i]);
            }
        }
    }

    function _getHashMessage(
        ClaimInfo calldata info
    ) internal view returns (bytes32) {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        CLAIMINFO_TYPEHASH,
                        info.user,
                        info.amount,
                        info.claimID
                    )
                )
            );
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
