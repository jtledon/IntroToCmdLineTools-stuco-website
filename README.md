find the sort order of the lessons:
* `rg "^\s+order: (\d+)" -r '$1' --no-line-number --no-heading --iglob "*.md*" | sort --field-separator=":" -k 2 -n`
* `rg "^\s+order: (\d+)" --replace '$1' --no-line-number --no-heading --iglob "*.md*" | awk --field-separator ":" '{print $2 " : " $1}' | sort --field-separator=":" --key=1 --numeric-sort`
* `rg "^\s+order: (\d+)" -r '$1' -N --no-heading -g "*.md*" | awk -F ":" '{print $2 " : " $1}' | sort -t ":" -k 1 -n`
