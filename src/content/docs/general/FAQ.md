---
title: FAQ
---


Why does my command have different flags than the one you showed in class / lecture notes?

If you have a Mac, some of these tools might be the apple version and not the GNU version. They generally have similar functionality, but slightly differ with their flags. A key example is xargs, where the apple version doesn’t support the “don’t run if empty” flag. To get the GNU versions, which is what I will be using in this class, run “brew install gnu-core” and call them with their normal name, prefixed with a g: xargs → gxargs or ls → gls

AHH! I DON'T CARE ABOUT THIS CLASS! JUST TELL ME HOW TO GET MY COMMIT BACK THAT I JUST SQUASHED/RESET --hard/RESTORE

If it was an existing commit, you can always check out the reflog, which maintains information on every time the tip of a branch changes. You don't have too much time, though, as dangling commits stored in reflog are garbage collected after 30 days by default
TODO: Here is a brief video on what the might look like:

Why is my bash `test` not working?

Bash is incredibly specific about whitespace. Its really annoying, but if you don't have whitespace between your square brackets it will fail.
The following is invalid syntax: `[[ -f $HOME/path/to/file]]`
Whereas this is valid syntax: `[[ -f $HOME/path/to/file ]]`

Why is my subshell or variable expansion not working in bash?

This is also something that's really annoying if you aren't familiar with the difference between "" and ''. bash will treat single quotes, '', as raw strings; their contents are never interpreted or resolved by bash. Double quotes, however, do have their contents parsed and interpreted by bash. That is why the following happens:
```bash
$ echo "$(whoami)" # jasonledon
$ echo '$(whoami)' # $(whoami)
```

