order:
	rg '^\s+order: (\d+)' --replace '$$1' --no-line-number --no-heading --iglob '*.md*' | awk --field-separator ':' '{print $$2 " : " $$1}' | sort --field-separator=':' --key=1 --numeric-sort
