import ValidationClient from "@/components/claim/ValidationClient";
import Title from "@/components/ui/Title";
import validationContractAbi from '@/lib/abi/AutonomousAirdrop.json';
import { buildAxiomQuery } from "@/lib/axiom";

export default async function Validate() {

  const { builtQuery, payment } = await buildAxiomQuery(
      Number(9909556),
    "0x86dfc0930cb222883cc0138873d68c1c9864fc2fe59d208c17f3484f489bef04",
    Number(1),
    Number(1),
    Number(1)
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
        />
      </div>
    </>
  )
}