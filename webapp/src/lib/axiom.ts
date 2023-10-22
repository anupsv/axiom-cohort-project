import { Constants } from '@/shared/constants';
import {
  Axiom,
  AxiomConfig,
  AxiomV2Callback,
  QueryV2,
  buildStorageSubquery,
  bytes32,
} from '@axiom-crypto/experimental';

export const buildAxiomQuery = async (
    blockNumber: number,
    slot: string,
    operatorId: number,
    quorum: number,
    arrayIndex: number
) => {
  if (!blockNumber || !slot || !operatorId || !quorum || !arrayIndex) {
    throw new Error("Invalid data provided for axiom query building.");
  }

  const config: AxiomConfig = {
    providerUri: process.env.PROVIDER_URI_GOERLI as string,
    version: "v2",
    chainId: 5,
    mock: true,
  }
  const axiom = new Axiom(config);
  const query = (axiom.query as QueryV2).new();

  // let receiptSubquery = buildReceiptSubquery(txHash)
  //   .log(logIdx)
  //   .topic(0) // topic 0: event schema
  //   .eventSchema(Constants.EVENT_SCHEMA);
  // query.appendDataSubquery(receiptSubquery);
  //
  // // Append a Receipt Subquery that checks the address recipient field
  // receiptSubquery = buildReceiptSubquery(txHash)
  //   .log(logIdx)
  //   .topic(2) // topic 2: recipient
  //   .eventSchema(Constants.EVENT_SCHEMA);
  // query.appendDataSubquery(receiptSubquery);
  //
  // // Append a Receipt Subquery that gets the block number of the transaction receipt
  // receiptSubquery = buildReceiptSubquery(txHash)
  //   .blockNumber(); // block number of the transaction
  // query.appendDataSubquery(receiptSubquery);

  // Append a Storage SubQuery with the adderss and the slot number provided.
  let storageSubQuery = buildStorageSubquery(blockNumber)
      .address(Constants.STAKE_REGISTRY)
      .slot(slot);
  console.log("storageSubQuery", storageSubQuery);
  query.appendDataSubquery(storageSubQuery);

  const callback: AxiomV2Callback = {
    target: Constants.VALIDATION_CONTRACT,
    extraData: bytes32(operatorId.toString() + quorum.toString() + arrayIndex.toString()), // need a way to pack and unpack this correctly.
  }
  query.setCallback(callback);

  // Validate the Query
  const isValid = await query.validate();
  console.log("isValid", isValid);

  // Build the Query
  const builtQuery = await query.build();

  // Calculate the payment
  const payment = query.calculateFee();

  return {
    builtQuery,
    payment,
  };
}
