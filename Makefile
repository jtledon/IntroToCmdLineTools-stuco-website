.SILENT:

order:
	# @rg '^\s+order: (\d+)' --replace '$$1' --no-line-number --no-heading --iglob '*.md*' | awk --field-separator ':' '{printf "%02s : %s\n", $$2, $$1}' | sort --field-separator=':' --key=1 --numeric-sort
	rg '^\s+order: (\d+)' --replace '$$1' --no-line-number --no-heading --iglob '*.md*' | awk --field-separator '[:/.]' '{printf "%02s : %s\n", $$7, $$5}' | sort --field-separator=':' --key=1 --numeric-sort
