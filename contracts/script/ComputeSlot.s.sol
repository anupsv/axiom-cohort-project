// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2, StdStorage} from "forge-std/Script.sol";
import "forge-std/StdStorage.sol";
import "forge-std/console.sol";

contract ComputeSlot is Script {
    using stdStorage for StdStorage;

    uint256 operatorIdToStakeHistorySlot = 435;
    // we assume we want to read the first element of the stake history array (I think this is the latest update)
    uint256 arrayIdx = 0;
    address stakeRegistryAddr = 0xf3257844195522CfE2d21EBF83456eC426F66cf4;

    function getStakeHistoryArraySlot(bytes32 operatorId, uint256 quorumNumber) public returns (bytes32) {
        // we need to find the slot number at which map[operatorId][quorumNum][0] resides
        // mapping(bytes32 => mapping(uint8 => (uint32,uint32,uint96)[]))
        // this requires computing some keccak hashes, which can't be done inside zk so we do it outside
        // and input the raw slot number to axiom to do a raw slot storage read
        bytes32 operatorIdSlot = keccak256(abi.encodePacked(operatorId, operatorIdToStakeHistorySlot));
        bytes32 quorumNumSlot = keccak256(abi.encodePacked(quorumNumber, operatorIdSlot));
        bytes32 stakeHistoryArraySlot = keccak256(abi.encodePacked(quorumNumSlot));

        // TODO: doesn't seem to be able to read raw slots, so will just read outside from cast
        // uint256 value = stdstore
        //     .target(stakeRegistryAddr)
        //     .read_uint();
        // console.log(value);

        return stakeHistoryArraySlot;
    }

    function decodeStakeUpdate(bytes32 stakeUpdate) public returns (uint96) {
        // require(stakeUpdate.length == 32, "Data length must be 32 bytes.");
        // (uint32 updateBlock, uint32 nextUpdateBlock, uint96 stake) = abi.decode(stakeUpdate, (uint32, uint32, uint96));
        uint96 stake = uint96(uint256(stakeUpdate) >> 64);
        return stake;
    }
}
