---
title: Writing bash code and terminal tricks
sidebar:
    order: 11
    hidden: true
    # badge: New
---

<!-- TODO: Maybe consider merging this with the dotfiles lesson -->

file globbing
`*.{c,h}`

`bash {script}` vs `./` vs `source` vs `.` vs adding to PATH

`()` vs `(())` vs `[[]]` vs `[]` vs test in `if` conditions

Bash scripting, `${}` variable substitution vs `$()` vs ``

interactive vs non-interactive shells: what they are and the impact that it has

`!!` And `!$` and `!^` and all variations for referencing the previous command

`pushd` / `popd` for scripting purposes of changing directories

`""` vs `''` - `""` allows for bash interpolation such as `"$HOME"`, which will be computed as `/home/jasonledon/`, but `''` treats it as a full string

cron jobs for automating commands to run at a specific time

Environment variables
$PATH

difference between source, . , ./
    one runs as a binary in a subshell, the other runs in the current context
    that's why running source ~/.bashrc updates your current terminal session

TODO: mention posix compliance
