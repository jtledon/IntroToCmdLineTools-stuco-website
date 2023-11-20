---
title: FAQ
---


Why does my command have different flags than the one you showed in class / lecture notes?

If you have a Mac, some of these tools might be the apple version and not the GNU version. They generally have similar functionality, but slightly differ with their flags. A key example is xargs, where the apple version doesn’t support the “don’t run if empty” flag. To get the GNU versions, which is what I will be using in this class, run “brew install gnu-core” and call them with their normal name, prefixed with a g: xargs → gxargs or ls → gls

AHH! I DON'T CARE ABOUT THIS CLASS! JUST TELL ME HOW TO GET MY COMMIT BACK THAT I JUST SQUASHED/RESET --hard/RESTORE

If it was an existing commit, you can always check out the reflog, which maintains information on every time the tip of a branch changes. You don't have too much time, though, as dangling commits stored in reflog are garbage collected after 30 days by default
TODO: Here is a brief video on what the might look like:

Why is my bash test not working?

Bash is incredibly specific about whitespace. Its really annoying, but if you don't have whatspace between your square brackets it will fail.
The following is invalid syntax: `[[ -f $HOME/path/to/file]]`
Whereas this is valid syntax: `[[ -f $HOME/path/to/file ]]`

Why is my function call not working in bash?

This is also something that's really annoying, but if you are doing trying to call a function, and insert the content into a string, which is a common pattern for writing a custom prompt, single quotes ('') and double quotes ("") have different behaviour. Single quotes will... and double quotes will...
