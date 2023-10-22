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
) => {
  if (!blockNumber || !slot) {
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

  // Append a Storage SubQuery with the adderss and the slot number provided.
  let storageSubQuery = buildStorageSubquery(blockNumber)
      .address(Constants.STAKE_REGISTRY)
      .slot(slot);
  console.log("storageSubQuery", storageSubQuery);
  query.appendDataSubquery(storageSubQuery);

  const callback: AxiomV2Callback = {
    target: Constants.VALIDATION_CONTRACT,
    extraData: bytes32(slot),
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
