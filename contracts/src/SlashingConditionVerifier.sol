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

    // probably admin function or something.
    function processSlashing(
        IAxiomV2Input.AxiomV2QueryData calldata axiomData
    ) external payable {
        _validateDataQuery(axiomData.dataQuery);
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

        // Parse results
        bytes32 slotData = axiomResults[0];

        // todo: verify the slot data received against the extraData received which is the decomposed ref vals.
        
        // Handle results
        
    }

    function _validateDataQuery(bytes calldata dataQuery) internal view {
        // Decode the storage subQuery from the DataQuery
        (AxiomV2Decoder.DataQueryHeader memory header, bytes calldata dq0) = AxiomV2Decoder.decodeDataQueryHeader(dataQuery);
        (AxiomV2Decoder.StorageSubquery memory storageSq0, ) = AxiomV2Decoder.decodeStorageSubquery(dq0);

        // Validate that this query is only for the chain that this contract is deployed on
        require(header.sourceChainId == block.chainid, "DataQuery sourceChainId be the same as the deployed contract's chainId");

        // Check that the types for all of the incoming Subqueries are correct
        require(storageSq0.subqueryType == uint16(AxiomV2Decoder.SubqueryType.Storage), "storageSq0.subqueryType must be 4");


        // Check block number and tx indexes for all Receipt and Tx Subqueries match
        require(keccak256(abi.encode(receiptSq0.blockNumber)) == keccak256(abi.encode(receiptSq1.blockNumber)), "blockNumber[0,1] for dataQuery do not match");
        require(keccak256(abi.encode(receiptSq1.blockNumber)) == keccak256(abi.encode(receiptSq2.blockNumber)), "blockNumber[1,2] for dataQuery do not match");
        require(keccak256(abi.encode(receiptSq2.blockNumber)) == keccak256(abi.encode(txSq0.blockNumber)), "blockNumber[3,4] for dataQuery do not match");
        require(keccak256(abi.encode(txSq0.blockNumber)) == keccak256(abi.encode(storageSq0.blockNumber)), "blockNumber[4,5] for dataQuery do not match");

        require(keccak256(abi.encode(receiptSq0.txIdx)) == keccak256(abi.encode(receiptSq1.txIdx)), "txIdx[0,1] for dataQuery do not match");
        require(keccak256(abi.encode(receiptSq1.txIdx)) == keccak256(abi.encode(receiptSq2.txIdx)), "txIdx[1,2] for dataQuery do not match");
        require(keccak256(abi.encode(receiptSq2.txIdx)) == keccak256(abi.encode(txSq0.txIdx)), "txIdx[3,4] for dataQuery do not match");
        require(keccak256(abi.encode(txSq0.txIdx)) == keccak256(abi.encode(storageSq0.txIdx)), "txIdx[4,5] for dataQuery do not match");

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