// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "./libraries/VRC25.sol";

contract CreateTour is VRC25 {
    struct TourInfo {
        uint256 startTime;
        uint256 endTimeRegister;
        uint256 priceTour;
        uint256 guaranteeFee;
        uint256 limitClient;
        bool status;
        address tourGuide;
    }

    uint256 protocolFee;
    address token;

    mapping(bytes32 => TourInfo) private tourInfo;
    mapping(address => bool) public blackList;
    mapping(bytes32 => uint256) private numberParticipants;
    mapping(bytes32 => mapping(address => bool)) private checkRegister;
    mapping(bytes32 => mapping(address => bool)) private checkAttendences;

    event CreateTourEvent(bytes32, uint256, uint256, uint256, uint256);
    event Registration(address, bytes32);
    event CancelTour(bytes32);
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        address _token,
        uint256 _protocolFee
    ) VRC25(name, symbol, decimals_) {
        token = _token;
        protocolFee = _protocolFee;
    }
    /**
     * @notice create a Tour
     * @param id id of the tour
     * @param endTimeRegister The time when register end
     * @param priceTour Price of the tour
     * @param guaranteeFee guarantee fee of the tour
     * @param limitClient Limit client of tour
     */
    function createTour(
        bytes32 id,
        uint256 endTimeRegister,
        uint256 priceTour,
        uint256 guaranteeFee,
        uint256 limitClient
    ) public {
        require(block.timestamp < endTimeRegister, "Invalid Time");
        require(tourInfo[id].tourGuide == address(0), "Invalid ID");
        uint256 fee = (limitClient * priceTour * protocolFee) / 10000;
        IVRC25(token).transferFrom(msg.sender, address(this), fee);
        tourInfo[id].startTime = block.timestamp;
        tourInfo[id].priceTour = priceTour;
        tourInfo[id].guaranteeFee = guaranteeFee;
        tourInfo[id].endTimeRegister = endTimeRegister;
        tourInfo[id].status = true;
        tourInfo[id].tourGuide = msg.sender;
        tourInfo[id].limitClient = limitClient;
        emit CreateTourEvent(
            id,
            endTimeRegister,
            priceTour,
            guaranteeFee,
            limitClient
        );
    }

    /**
     * @notice register the tour
     * @param id id of the tour
     */

    function registerTour(bytes32 id) public {
        TourInfo storage info = tourInfo[id];
        require(info.status, "tour cancelled");
        require(!checkRegister[id][msg.sender], "Registed");
        require(numberParticipants[id] < info.limitClient, "LIMIT");
        require(block.timestamp <= info.endTimeRegister, "Invalid Time");
        uint256 fee = info.guaranteeFee + info.priceTour;
        IVRC25(token).transferFrom(msg.sender, address(this), fee);
        numberParticipants[id]++;
        checkRegister[id][msg.sender] = true;
        emit Registration(msg.sender, id);
    }

    /**
     * @notice checkAttendence check attendences
     * @param id id of the tour
     * @param participants people who attended
     */

    function checkAttendence(
        bytes32 id,
        address[] calldata participants
    ) public {
        TourInfo storage info = tourInfo[id];
        require(info.tourGuide == msg.sender, "You are not tour guide");
        require(info.status, "tour cancelled");
        require(block.timestamp > info.endTimeRegister, "Invalid Time");
        for (uint256 i; i < participants.length; i++) {
            require(checkRegister[id][participants[i]], "You not register");
            checkAttendences[id][participants[i]] = true;
        }
    }

    /**
     * @notice claimGuaranteeFee for client and tour guide claim
     * @param id id of the tour
     */

    function claimGuaranteeFee(bytes32 id) public {
        TourInfo storage info = tourInfo[id];
        require(checkRegister[id][msg.sender], "You not register");
        if (checkAttendences[id][msg.sender] && !blackList[info.tourGuide]) {
            IVRC25(token).transfer(msg.sender, info.guaranteeFee);
            IVRC25(token).transfer(info.tourGuide, info.priceTour);
        } else if (
            !checkAttendences[id][msg.sender] && !blackList[info.tourGuide]
        ) {
            IVRC25(token).transfer(msg.sender, info.priceTour);
            IVRC25(token).transfer(info.tourGuide, info.guaranteeFee);
            numberParticipants[id]--;
        } else {
            IVRC25(token).transfer(
                msg.sender,
                info.guaranteeFee + info.priceTour
            );
        }
        checkRegister[id][msg.sender] = false;
    }

    function cancelTour(bytes32 id) public {
        TourInfo storage info = tourInfo[id];
        require(block.timestamp <= info.endTimeRegister, "Invalid Time");
        require(info.tourGuide == msg.sender, "You are not tour guide");
        require(info.status, "tour cancelled");
        info.status = false;
        emit CancelTour(id);
    }

    function claimWhenCancel(bytes32 id) public {
        TourInfo storage info = tourInfo[id];
        require(checkRegister[id][msg.sender], "You not register");
        require(!info.status, "Tour haven't cancelled");
        IVRC25(token).transfer(msg.sender, info.guaranteeFee + info.priceTour);
        checkRegister[id][msg.sender] = false;
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

    function setProtocolFee(uint256 newFee) public onlyOwner {
        protocolFee = newFee;
    }

    function setToken(address newToken) public onlyOwner {
        token = newToken;
    }

    function setBlackList(bytes32 id, bool status) public onlyOwner {
        TourInfo storage info = tourInfo[id];
        blackList[info.tourGuide] = status;
    }

    function checkInfo(bytes32 id) public view returns (TourInfo memory) {
        TourInfo storage info = tourInfo[id];
        return info;
    }

    function checkProtocolFee() public view returns (uint256) {
        return protocolFee;
    }

    function checkNumberParticipants(bytes32 id) public view returns (uint256) {
        return numberParticipants[id];
    }

    function checkIsRegistered(
        bytes32 id,
        address user
    ) public view returns (bool) {
        return checkRegister[id][user];
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
