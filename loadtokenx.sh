export $(kubectl exec --tty deployment/bidrag-reisekostnad-ui printenv | grep TOKEN_X)
