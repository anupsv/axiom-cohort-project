"use client";

import { Constants } from "@/shared/constants";
import {BuiltQueryV2, bytes32} from "@axiom-crypto/experimental";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractEvent, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { formatEther, parseEther } from "viem";
import Link from "next/link";

export default function ValidationClient(
  { abi, builtQuery, payment, operatorId, quorumNumber, operatorIdToStakeHistorySlot }: {
    abi: any[],
    builtQuery: BuiltQueryV2,
    payment: string,
    operatorId: string,
    quorumNumber: number,
    operatorIdToStakeHistorySlot: number
  }
) {
  const { address } = useAccount();
  const router = useRouter();
  const [showExplorerLink, setShowExplorerLink] = useState(false);

  const claimParams = [
    builtQuery.sourceChainId,
    builtQuery.dataQueryHash,
    builtQuery.computeQuery,
    builtQuery.callback,
    builtQuery.userSalt,
    builtQuery.maxFeePerGas,
    builtQuery.callbackGasLimit,
    address,
    builtQuery.dataQuery
  ];

  // Prepare hook for the sendQuery transaction
  const { config } = usePrepareContractWrite({
    address: Constants.VALIDATION_CONTRACT as `0x${string}`,
    abi: abi,
    functionName: 'processSlashing',
    args: [bytes32(operatorId), quorumNumber, bytes32(operatorIdToStakeHistorySlot), claimParams],
    value: BigInt(payment),
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);


  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowExplorerLink(true);
      }, 15000);
    }
  }, [isSuccess, setShowExplorerLink]);

  const proofGeneratedAction = useCallback(() => {
    router.push(`success/?address=${address}`);
  }, [router, address]);

  const proofValidationFailedAction = useCallback(() => {
    router.push(`fail/?address=${address}`);
  }, [router, address]);

  // Monitor contract for `ClaimAirdrop` or `ClaimAirdropError` events
  useContractEvent({
    address: Constants.VALIDATION_CONTRACT as `0x${string}`,
    abi: abi,
    eventName: 'ClaimAirdrop',
    listener(log) {
      console.log("Claim airdrop success");
      console.log(log);
      proofGeneratedAction();
    },
  });

  useContractEvent({
    address: Constants.VALIDATION_CONTRACT as `0x${string}`,
    abi: abi,
    eventName: 'Error',
    listener(log) {
      console.log("Claim airdrop error");
      console.log(log);
      proofValidationFailedAction();
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isLoading) {
      return "Confirm transaction in wallet...";
    }
    return "Let's do this";
  }

  const renderClaimProofText = () => {
    return `Generating the proof for the costs ${formatEther(BigInt(payment)).toString()}ETH`;
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`https://explorer.axiom.xyz/v2/goerli`} target="_blank">
        View status on Axiom Explorer
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={isLoading || isSuccess}
        onClick={() => write?.()}
      >
        {renderButtonText()}
      </Button>
      <div className="flex flex-col items-center text-sm gap-2">
        <div>
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderClaimProofText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}
