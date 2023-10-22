// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";

contract CounterScript is Script {

    uint256 operatorIdToStakeHistorySlot = 435;
    // we assume we want to read the first element of the stake history array (I think this is the latest update)
    uint256 arrayIdx = 0;

    function run(bytes32 operatorId, uint256 quorumNumber) public view returns (bytes32) {
        // we need to find the slot number at which map[operatorId][quorumNum][0] resides
        // mapping(bytes32 => mapping(uint8 => (uint32,uint32,uint96)[]))
        // this requires computing some keccak hashes, which can't be done inside zk so we do it outside
        // and input the raw slot number to axiom to do a raw slot storage read
        bytes32 operatorIdSlot = keccak256(abi.encodePacked(operatorId, operatorIdToStakeHistorySlot));
        bytes32 quorumNumSlot = keccak256(abi.encodePacked(quorumNumber, operatorIdSlot));
        bytes32 stakeHistoryArraySlot = keccak256(abi.encodePacked(quorumNumSlot));
        return stakeHistoryArraySlot;
    }
}
