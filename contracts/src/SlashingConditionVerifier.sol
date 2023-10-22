// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxiomV2Client } from './AxiomV2Client.sol';
import { IERC20 } from '@openzeppelin-contracts/token/ERC20/IERC20.sol';
import { Ownable } from '@openzeppelin-contracts/access/Ownable.sol';
import { IAxiomV2Input } from './interfaces/IAxiomV2Input.sol';
import { IAxiomV2Query } from './interfaces/IAxiomV2Query.sol';
import { AxiomV2Decoder } from './libraries/AxiomV2Decoder.sol';

contract SlashingConditionVerifier is AxiomV2Client {

    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event AxiomCallbackCallerAddrUpdated(address axiomCallbackCallerAddr);

    uint64 public callbackSourceChainId;
    address public axiomCallbackCallerAddr;
    bytes32 public axiomCallbackQuerySchema;
    mapping(address => bool) public querySubmitted;

    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackCallerAddr = address(this);
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function convertBytesToBytes32(bytes memory input) public pure returns (bytes32 result) {
        require(input.length == 32, "Input must be 32 bytes");
        assembly {
            result := mload(add(input, 32))
        }
    }

    // probably admin function or something.
    function processSlashing(
        bytes32 operatorId,
        uint256 quorumNumber,
        uint256 operatorIdToStakeHistorySlot,
        IAxiomV2Input.AxiomV2QueryData calldata axiomData
    ) external payable {

        // ArrayIndex no longer needed per comment on script. We currently only need to read 0th index.
        bytes32 operatorIdSlot = keccak256(abi.encodePacked(operatorId, operatorIdToStakeHistorySlot));
        bytes32 quorumNumSlot = keccak256(abi.encodePacked(quorumNumber, operatorIdSlot));
        bytes32 rawStorageSlot = keccak256(abi.encodePacked(quorumNumSlot));
        require(rawStorageSlot == convertBytesToBytes32(axiomData.callback.extraData), "Storage slot used in callback was incorrect");

//        _validateDataQuery(axiomData.dataQuery);
        uint256 queryId = IAxiomV2Query(axiomV2QueryAddress).sendQuery{ value: msg.value }(
            axiomData.sourceChainId,
            axiomData.dataQueryHash,
            axiomData.computeQuery,
            axiomData.callback,
            axiomData.userSalt,
            axiomData.maxFeePerGas,
            axiomData.callbackGasLimit,
            axiomData.refundee,
            axiomData.dataQuery
        );
    }

    function _axiomV2Callback(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal virtual override {

        bytes32 rawStorageSlot = abi.decode(extraData, (bytes32));

        // Parse results
        bytes32 slotData = axiomResults[0];

        // unpack the data according to the OperatorStake struct format
        uint32 updateBlockNumber = uint32(uint256(slotData) >> (256 - 32));
        uint32 nextUpdateBlockNumber = uint32(uint256(slotData) >> (256 - 32 - 32));
        uint96 stake = uint96(uint256(slotData));

        // Do stuff with the stake value

    }

    function _validateDataQuery(bytes calldata dataQuery) internal view {
        // Decode the storage subQuery from the DataQuery
        (AxiomV2Decoder.DataQueryHeader memory header, bytes calldata dq0) = AxiomV2Decoder.decodeDataQueryHeader(dataQuery);
        (AxiomV2Decoder.StorageSubquery memory storageSq0, ) = AxiomV2Decoder.decodeStorageSubquery(dq0);

        // Validate that this query is only for the chain that this contract is deployed on
        require(header.sourceChainId == block.chainid, "DataQuery sourceChainId be the same as the deployed contract's chainId");

        // Check that the types for all of the incoming Subqueries are correct
        require(storageSq0.subqueryType == uint16(AxiomV2Decoder.SubqueryType.Storage), "storageSq0.subqueryType must be 4");
    }

    function _validateAxiomV2Call(
        uint64 sourceChainId,
        address callerAddr,
        bytes32 querySchema
    ) internal virtual override {
        require(sourceChainId == callbackSourceChainId, "AxiomV2: caller sourceChainId mismatch");
        require(callerAddr == axiomCallbackCallerAddr, "AxiomV2: caller address mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AxiomV2: query schema mismatch");
    }
}