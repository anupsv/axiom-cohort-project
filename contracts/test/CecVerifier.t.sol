// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {CecVerifier} from "../src/CecVerifier.sol";

contract CecVerifierTest is Test {
    CecVerifier public cecVerifier;

    address queryAddress = address(0);
    uint64 sourceChainId = 5;
    bytes32 querySchema = 0x0;

    function setUp() public {
        cecVerifier = new CecVerifier(
            queryAddress,
            sourceChainId,
            querySchema
        );
    }

    function test_axiomV2Callback() public {
        bytes32[] memory axiomResults = new bytes32[](1);
        axiomResults[0] = 0x00000000000000000000000000000000000000000000000100000000009707DF;
        bytes memory extraData = new bytes(0);
        vm.prank(queryAddress);
        cecVerifier.axiomV2Callback(sourceChainId, address(0), querySchema, 0, axiomResults, extraData);
        // TODO: check that something changed in the contract..
        // assertEq(counter.number(), 1);
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
