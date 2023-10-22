############################# HELP MESSAGE #############################
# Make sure the help command stays first, so that it's printed by default when `make` is called without arguments
.PHONY: help tests
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

STAKE_REGISTRY=0xf3257844195522CfE2d21EBF83456eC426F66cf4
QUORUM_NUM=0
OPERATOR_ID=0xe605a4951e1bf738ac88fea0c37c9c5a5652d2def52177c2f01295ebacdcccc1

read-stake-of-operator-quorum: ## retrieve stake of OPERATOR_ID/QUORUM_NUM from STAKE_REGISTRY (run `make start-anvil-fork-goerli` first)
	scripts/read-stake-update.sh $(OPERATOR_ID) $(QUORUM_NUM) $(STAKE_REGISTRY)

start-anvil-fork-goerli: ## starts an anvil chain that forks off of goerli
	anvil --fork-url https://ethereum-goerli.publicnode.com