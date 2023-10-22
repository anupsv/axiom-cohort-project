// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AxiomV2Client} from "./AxiomV2Client.sol";
import {IERC20} from "@openzeppelin-contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";
import {IAxiomV2Query} from "./interfaces/IAxiomV2Query.sol";

contract CecVerifier is AxiomV2Client, Ownable {
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event AxiomCallbackCallerAddrUpdated(address axiomCallbackCallerAddr);

    address public constant STAKE_REGISTRY_ADDR =
        0xf3257844195522CfE2d21EBF83456eC426F66cf4;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    mapping(address => bool) public querySubmitted;

    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function _validateAxiomV2Call(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema
    ) internal virtual override {
        require(
            sourceChainId == callbackSourceChainId,
            "AxiomV2: caller sourceChainId mismatch"
        );
        require(
            querySchema == axiomCallbackQuerySchema,
            "AxiomV2: query schema mismatch"
        );
        // we don't verify callerAddr because this is the address of the challenger who is creating a fraud proof,
        // and we want this call to be permissionless (so anyone should be able to call it)
    }

    function _axiomV2Callback(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal virtual override {

        // Parse results
        bytes32 slotData = axiomResults[0];

    }
}
