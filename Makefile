############################# HELP MESSAGE #############################
# Make sure the help command stays first, so that it's printed by default when `make` is called without arguments
.PHONY: help tests
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

QUORUM_NUM=0
OPERATOR_ID=0xe605a4951e1bf738ac88fea0c37c9c5a5652d2def52177c2f01295ebacdcccc1

compute-stake-slot: ## finds the slot of OPERATOR_ID/QUORUM_NUM in the operatorIdToStakeHistorySlot mapping
	cd contracts && \
	forge script script/ComputeSlot.s.sol --sig "run(bytes32 operatorId, uint256 quorumNumber) public returns (bytes32)" $(OPERATOR_ID) $(QUORUM_NUM)