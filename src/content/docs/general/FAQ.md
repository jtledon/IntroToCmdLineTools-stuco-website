---
title: FAQ
---


1. **Why does my command have different flags than the one you showed in class / lecture notes?**\
If you have a Mac, some of these tools might be the apple version and not the GNU version. They generally have similar functionality, but slightly differ with their flags. A key example is xargs, where the apple version doesn’t support the “don’t run if empty” flag. To get the GNU versions, which is what I will be using in this class, run “brew install gnu-core” and call them with their normal name, prefixed with a g: xargs → gxargs or ls → gls

2. **"AHH! I DON'T CARE ABOUT THIS CLASS! JUST TELL ME HOW TO GET MY COMMIT BACK THAT I JUST SQUASHED/`reset --hard`/`restore .`"**
* _**Commit**_: You can always check out the reflog, which maintains information on every time a git `REF` changes. There is a time limit, though: git will prune this log, removing entries that are more than 90 days old. Look [here](http://localhost:4321/lessons/git-1/#reflog) for information on how to recover this data, along with a video and animation walking through the steps.
* _**Staged Change**_: You can run `git fsck --lost-found` and look for entries that are `dangling blob`s, since your changes never made it to the commit level. You can view the contents of these blobs by using `git show {blob}`.
* _**Working Directory**_: If the file changes were only in the working directory and were never committed, staged, or stashed, these changes are likely gone forever, as git was never told to interact with them, and therefore did not store this data anywhere.

3. **Why is my bash `test` not working?**\
Bash is incredibly specific about whitespace. Its really annoying, but if you don't have whitespace between your square brackets it will fail.
The following is invalid syntax: `[[ -f $HOME/path/to/file]]`
Whereas this is valid syntax: `[[ -f $HOME/path/to/file ]]`

4. **Why is my subshell or variable expansion not working in bash?**\
This is also something that's really annoying if you aren't familiar with the difference between "" and ''. bash will treat single quotes, ' ', as raw strings; their contents are never interpreted or resolved by bash. Double quotes, however, do have their contents parsed and interpreted by bash. That is why the following happens:
```bash
$ echo "$(whoami)" # jasonledon
$ echo '$(whoami)' # $(whoami)
```
