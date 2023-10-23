import ValidationClient from "@/components/claim/ValidationClient";
import Title from "@/components/ui/Title";
import validationContractAbi from '@/lib/abi/SlashingConditionVerifier.json';
import { buildAxiomQuery } from "@/lib/axiom";
import {bytes32} from "@axiom-crypto/experimental";

export default async function Validate() {

  const { builtQuery, payment } = await buildAxiomQuery(
      Number(9897951),
    "0xcbcc1482677ec2e1d747a7f7118c84e46887479eecf90bf7850b6ca501659ce6",
  );
  console.log("Axiom Query built! QueryHash:", builtQuery.queryHash);

  return (
    <>
      <Title>
        Testing Stake Proof
      </Title>
      <div className="text-center">
        Click the buttom to start
      </div>
      <div className="flex flex-col gap-2 items-center">
        <ValidationClient
          abi={validationContractAbi.abi}
          builtQuery={builtQuery}
          payment={payment}
          operatorId="0xe605a4951e1bf738ac88fea0c37c9c5a5652d2def52177c2f01295ebacdcccc1"
          quorumNumber={0}
          operatorIdToStakeHistorySlot={435}
        />
      </div>
    </>
  )
}