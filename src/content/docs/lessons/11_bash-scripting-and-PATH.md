---
title: Writing bash code and terminal tricks
---

<!-- TODO: Maybe consider merging this with the dotfiles lesson -->

file globbing
`*.{c,h}`

`./` vs `source` vs adding to PATH

`()` vs `(())` vs `[[]]` vs `[]` vs test in `if` conditions

Bash scripting, `${}` variable substitution vs `$()` vs ``

interactive vs non-interactive shells: what they are and the impact that it has

`!!` And `!$` and `!^` and all variations for referencing the previous command

`pushd` / `popd` for scripting purposes of changing directories

`""` vs `''` - `""` allows for bash interpolation such as `"$HOME"`, which will be computed as `/home/jasonledon/`, but `''` treats it as a full string

cron jobs for automating commands to run at a specific time
