#!/bin/bash

# change dir to dir of script
cd "$(dirname "$0")"

# set OPERATOR_ID to $1 else exit
if [ -z "$1" ]; then
    echo "OPERATOR_ID is unset"
    exit 1
fi
if [ -z "$2" ]; then
    echo "QUORUM_NUM is unset"
    exit 1
fi
if [ -z "$3" ]; then
    echo "STAKE_REGISTRY is unset"
    exit 1
fi
OPERATOR_ID=$1
QUORUM_NUM=$2
STAKE_REGISTRY=$3
echo "Fetching stake for operator $OPERATOR_ID and quorum $QUORUM_NUM from StakeRegistry ($STAKE_REGISTRY) - from latest block (TODO)"

cd ../contracts
computeSlotOutputJson=$(forge script script/ComputeSlot.s.sol --sig "getStakeHistoryArraySlot(bytes32 operatorId, uint256 quorumNumber) public returns (bytes32)" ${OPERATOR_ID} ${QUORUM_NUM} --silent --json)
slot=$(echo $computeSlotOutputJson | jq -r '.returns["0"].value')
echo "slot: $slot"
stakeUpdate=$(cast storage $STAKE_REGISTRY $slot)
echo "stakeUpdate (value@slot): $stakeUpdate"
decodeStakeUpdateOutputJson=$(forge script script/ComputeSlot.s.sol --sig "decodeStakeUpdate(bytes32 stakeUpdate) public returns (uint96)" $stakeUpdate --silent --json --rpc-url http://localhost:8545)
stake=$(echo $decodeStakeUpdateOutputJson | jq -r '.returns["0"].value')
echo "stake: $stake"
